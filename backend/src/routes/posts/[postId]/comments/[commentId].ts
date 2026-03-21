import knex from '../../../../database/connection.js';

import type { Handler } from "express";
import { z } from "zod";
import { isAuthenticated } from "../../../../middlewares/isAuthenticated.js";
import { INVALID_PARAMETERS, NOT_FOUND } from "../../../../errors.js";

export const del: Handler[] = [
    isAuthenticated,
    (req, res, next) => {
        const { success, data, error } = z
            .object({ commentId: z.coerce.number().int().positive() })
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
        const { commentId } = req.params;

        const deleted = await knex('comments')
            .where({ id: commentId, user_id: req.user!.id })
            .delete()

        if (!deleted) return res.status(404).json({
            success: false,
            error: NOT_FOUND
        })

        return res.status(204).end();
    }
]