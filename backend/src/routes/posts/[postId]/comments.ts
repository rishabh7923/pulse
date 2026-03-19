import knex from '../../../database/connection.js'
import type { Handler } from 'express';
import { z } from "zod";
import { isAuthenticated } from '../../../middlewares/isAuthenticated.js';
import { INVALID_PARAMETERS } from '../../../errors.js';

export const post: Handler[] = [
    isAuthenticated,
    (req, res, next) => {
        const { success, data, error } = z.object({
            params: z.object({
                postId: z.coerce.number().int().positive()
            }),
            body: z.object({
                content: z.string().min(1)
            })
        }).safeParse({
            params: req.params,
            body: req.body
        })

        if (!success) {
            return res.status(400).json({
                success: false,
                error: {
                    ...INVALID_PARAMETERS,
                    message: `(${error.issues[0]?.path.join('.')}) ${error.issues[0]?.message}`,
                },
            });
        }

        req.params = data.params as any;
        req.body = data.body as any;

        next();
    },
    async (req, res) => {
        const { postId } = req.params;
        const { content } = req.body;

        const [id] = await knex('comments').insert({
            post_id: postId,
            user_id: req.user!.id,
            content,
        });

        res.status(201).json({
            success: true,
            data: { id, post_id: postId, user_id: req.user!.id, content }
        })
    }
]

export const get: Handler[] = [
    isAuthenticated,
    (req, res, next) => {
        const { success, data, error } = z
            .object({ postId: z.coerce.number().int().positive() })
            .safeParse(req.params);

        if (!success) {
            return res.status(400).json({
                success: false,
                error: {
                    ...INVALID_PARAMETERS,
                    message: `(${error.issues[0]?.path.join('.')}) ${error.issues[0]?.message}`,
                },
            });
        }

        req.params = data as any;
        next();
    },
    async (req, res) => {
        const { postId: post_id } = req.params;
        const comments = await knex('comments').where({ post_id })

        return res.status(200).json({
            success: true,
            data: { comments },
        })
    }
]