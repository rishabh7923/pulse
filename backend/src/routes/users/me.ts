import type { Handler } from "express"
import { isAuthenticated } from "../../middlewares/isAuthenticated.js"

export const get: Handler[] = [
    isAuthenticated,
    async (req, res) => {
        const user = req.user!;

        return res.status(200)
            .json({ success: true, data: { user } })
    }
]