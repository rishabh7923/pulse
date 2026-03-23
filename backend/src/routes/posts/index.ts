import type { Handler } from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'

import multer from "multer";

import { Post } from "../../database/entity/Post.js";
import { LessThan } from "typeorm";

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

        const { id: postId } = await Post.save({
            content,
            category: { id: category_id },
            user: { id: req.user.id },
            attachments: uploaded.map((x) => ({
                url: x.secure_url,
            })),
        });

        const post = await Post.findOne({
            where: { id: postId },
            relations: { attachments: true, user: true, category: true }
        });

        res.status(201).json({ success: true, data: { post } });
    }
]

export const get: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const cursor = req.query.cursor as string | undefined;
        const [cursorCreatedAt, cursorId] = cursor ? cursor.split("_") : [undefined, undefined];

        //set default limit and make sure it can not be set more than 50
        const limit = Math.min(Number(req.query.limit) || 10, 50);

        const posts = await Post.find({
            where: (cursorCreatedAt && cursorId) ? [
                { created_at: LessThan(new Date(cursorCreatedAt)) },
                { created_at: new Date(cursorCreatedAt), id: LessThan(Number(cursorId)) }
            ] : {},
            order: { created_at: 'DESC', id: 'DESC' },
            take: limit,
            relations: { user: true, attachments: true, category: true },
        })

        const lastPost = posts[posts.length - 1];

        return res.status(200).json({
            success: true,
            data: { posts },
            pagination: {
                next_cursor: lastPost ? `${lastPost.created_at.toISOString()}_${lastPost.id}` : null
            }
        })
    }
]