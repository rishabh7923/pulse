import type { Handler } from "express";
import { isAuthenticated } from "../../../middlewares/isAuthenticated.js";
import { INVALID_PARAMETERS, NOT_FOUND } from "../../../errors.js";
import { Post } from "../../../database/entity/Post.js";

export const get: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const { postId } = req.params;
        if (!postId || !Number(postId))
            return res.status(400).json({ success: false, error: INVALID_PARAMETERS })

        const post = await Post.findOne({
            where: { id: Number(postId) },
            relations: { user: true, category: true, attachments: true }
        })

        return res.status(200).json({
            success: true,
            data: { post }
        })
    }
]

export const del: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const { postId } = req.params;
        if (!postId || !Number(postId))
            return res.status(400).json({ success: false, error: INVALID_PARAMETERS }) 

        const deleted = await Post.delete({
            id: Number(postId),
            user: { id: req.user.id }
        })

        if (!deleted.affected) return res.status(404).json({
            success: false,
            error: NOT_FOUND
        })

        return res.status(204).end();
    }
]