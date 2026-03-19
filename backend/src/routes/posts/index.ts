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
        const { content, category_id } = req.body || {};
        const files = Array.isArray(req.files) ? req.files : [];

        const uploaded = await Promise.all(
            files.map(file =>
                cloudinary.uploader.upload(
                    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
                    { folder: 'attachments' }
                )
            )
        );

        const data = await knex.transaction(async (trx) => {
            const [postId] = await trx("posts").insert({
                content,
                category_id: category_id,
                user_id: req.user!.id,
            });

            if (uploaded.length) {
                await trx("attachments").insert(
                    uploaded.map(x => ({
                        type: "image",
                        url: x.secure_url,
                        post_id: postId
                    }))
                );
            }

            const [post, attachments] = await Promise.all([
                trx("posts").where({ id: postId }).first(),
                uploaded.length
                    ? trx("attachments").select("url", "type", "id").where({ post_id: postId })
                    : []
            ]);

            return { ...post, attachments };
        });

        res.status(201).json({ success: true, data });
    }
]

export const get: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const cursor = req.query.cursor as string | undefined;
        const [cursorCreatedAt, cursorId] = cursor ? cursor.split("_") : [undefined, undefined];

        //set default limit and make sure it can not be set more than 50
        const limit = Math.min(Number(req.query.limit) || 10, 50);

        // based query, which we will build up step by step based on scenario
        let postsQuery = knex("posts")
            .select("posts.*", knex.raw("CASE WHEN reactions.id IS NOT NULL THEN true ELSE false END as liked"))
            .leftJoin('reactions', function() {
                this
                    .on('reactions.post_id', '=', 'posts.id')
                    .andOn('reactions.user_id', '=', knex.raw('?', [req.user!.id]))
            })
            .orderBy('posts.created_at', 'desc')
            .orderBy('posts.id', 'desc')
            .limit(limit);

        /** if cursor id is provided */
        if (cursorCreatedAt && cursorId) {
            postsQuery = postsQuery.where(function () {
                this.where('posts.created_at', '<', cursorCreatedAt)
                    .orWhere(function () {
                        this.where('posts.created_at', '=', cursorCreatedAt)
                            .andWhere('posts.id', '<', Number(cursorId))
                    })
            });
        }
    
        const posts = await postsQuery;

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