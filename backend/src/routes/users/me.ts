import type { Handler } from "express"
import { isAuthenticated } from "../../middlewares/isAuthenticated.js"
import { User } from '../../database/entity/User.js';

export const get: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const user = await User.findOne({
            select: ['id', 'username', 'email', 'verified'],
            where: { id: req.user.id }
        })

        return res.status(200)
            .json({ success: true, data: { user } })
    }
]

export const del: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        await User.delete({ id: req.user.id });
        return res.status(204).end();
    }
]