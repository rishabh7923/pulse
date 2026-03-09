import type { Handler } from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'

import knex from "../../database/connection.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export const post: Handler[] = [
    isAuthenticated,
    upload.array("attachments"),
    async (req, res) => {
        const {
            content,
        } = req.body || {};

        const files = Array.isArray(req.files) ? req.files : [];
        const uploaded: UploadApiResponse[] = [];

        for (const file of files) {
            const uploadedFile = await cloudinary.uploader.upload(
                `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
                {
                    folder: 'attachments'
                }
            )

            uploaded.push(uploadedFile);
        }

        const data = await knex.transaction(async (trx) => {
            const [postId] = await trx("posts")
                .insert({
                    content,
                    user_id: req.user!.id,
                })

            await trx("attachments")
                .insert(
                    uploaded.map(x => ({
                        type: "image",
                        url: x.secure_url,
                        post_id: postId,
                    }))
                )

            const post = await trx("posts")
                .where({ id: postId })
                .first();

            const attachments = await trx("attachments")
                .select("url", "type", "id")
                .where({ post_id: postId });

            return {
                ...post,
                attachments,
            };
        })

        res.status(201).json({ success: true, data })
    }
]

export const get: Handler[] = [
    async (req, res) => {
        const cursor = req.query.cursor as string | undefined;
        const [cursorCreatedAt, cursorId] = cursor ? cursor.split("_") : [undefined, undefined];

        //set default limit and make sure it can not be set more than 50
        const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);

        //cursor based fetching posts (best for feeds)
        const posts = (cursorCreatedAt && cursorId)
            ? await knex("posts").where('created_at', '<', cursorCreatedAt)
                .orWhere(function () { this.where('created_at', '=', cursorCreatedAt).andWhere('id', '<', Number(cursorId)) })
                .orderBy('created_at', 'desc').limit(limit)
            : await knex("posts").orderBy('created_at', 'desc').limit(limit)

        //fetch all the attachment in one go to avoid N + 1 query problem 
        const attachments = posts.length 
            ? await knex("attachments").whereIn("post_id", posts.map(x => x.id))
            : [];

        const postsWithAttachment = posts.map((post) => ({
            ...post,
            attachments: attachments.filter(x => x.post_id === post.id)
        }));

        const lastPost = posts[posts.length - 1];

        return res.status(200).json({
            success: true,
            data: { posts: postsWithAttachment },
            pagination: {
                next_cursor: lastPost ? `${lastPost.created_at.toISOString()}_${lastPost.id}` : null
            }
        })
    }
]