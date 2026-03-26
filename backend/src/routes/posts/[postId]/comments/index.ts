import type { Handler } from 'express';
import { z } from "zod";
import { isAuthenticated } from '../../../../middlewares/isAuthenticated.js';
import { INVALID_PARAMETERS } from '../../../../errors.js';
import { Comment } from '../../../../database/entity/Comment.js';

export const post: Handler[] = [
    isAuthenticated,
    (req, res, next) => {
        const { success, data, error } = z.object({
            content: z.string().min(1)
        }).safeParse(req.body)

        if (!success) {
            return res.status(400).json({
                success: false,
                error: {
                    ...INVALID_PARAMETERS,
                    message: `(${error.issues[0]?.path.join('.')}) ${error.issues[0]?.message}`,
                },
            });
        }

        req.body = data as any;
        next();
    },
    async (req, res) => {
        const { postId } = req.params;
        const { content } = req.body;

        const addedComment = await Comment.save({
            post: { id: Number(postId) },
            user: { id: req.user.id },
            content
        })

        const comment = await Comment.findOne({
            where: { id: addedComment.id },
            relations: { user: true, post: true }
        })

        res.status(201).json({
            success: true,
            data: { comment }
        })
    }
]

export const get: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const { postId: post_id } = req.params;
        const comments = await Comment.find({
            where: { post: { id: Number(post_id) } },
            relations: { user: true }
        })

        return res.status(200).json({
            success: true,
            data: { comments },
        })
    }
]