import knex from "../../../database/connection.js"

import type { Handler } from "express";
import { isAuthenticated } from "../../../middlewares/isAuthenticated.js";
import { INVALID_PARAMETERS } from "../../../errors.js";

export const post: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const { postId } = req.params;
        if (!postId || !Number(postId)) return res.status(400).json({ success: false, error: INVALID_PARAMETERS })

        await knex.transaction(async (txn) => {
            const [id] = await txn('reactions')
                .insert({
                    post_id: postId,
                    user_id: req.user!.id
                })
                .onConflict(['post_id', 'user_id'])
                .ignore();

            if (id) {
                await txn('posts')
                    .where('id', postId)
                    .increment('likes_count', 1)
            }
        })

        return res.status(201).json({ success: true });
    }
]

export const del: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const { postId } = req.params;
        if (!postId || !Number(postId)) return res.status(400).json({ success: false, error: INVALID_PARAMETERS })

        await knex.transaction(async (txn) => {
            const deleted = await txn('reactions')
                .delete()
                .where({ post_id: postId, user_id: req.user?.id })

            if (deleted > 0) await txn('posts')
                .where('id', postId)
                .andWhere('likes_count', '>', '0') //just to be sure
                .decrement('likes_count', 1)
        })

        return res.status(200).json({ success: true })
    }
]