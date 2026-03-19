import knex from '../../database/connection.js'

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

export const del: Handler[] =[
    isAuthenticated,
    async (req, res) => {
        const user = req.user!;

        await knex('users')
            .delete()
            .where({ id: user.id });

        return res.status(204).end();
    }
]