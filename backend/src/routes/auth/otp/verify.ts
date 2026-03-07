import type { Handler } from 'express';
import knex from '../../../database/connection.js';
import { INVALID_PARAMETERS } from '../../../errors.js';
import { isAuthenticated } from '../../../middlewares/isAuthenticated.js';

export const post: Handler[] = [isAuthenticated, async (req, res) => {
    const otp = req.body.otp;
    if (!otp || otp.length != 6 || isNaN(otp))
        return res.status(400).json({ success: false, error: INVALID_PARAMETERS })

    if (
        !await knex('otps')
            .select('*')
            .where({ user_id: req.user?.id, otp })
            .andWhere('expires_at', '>', knex.fn.now())
            .first()
    ) return res.status(200).json({ success: false });

    await knex.transaction(async (trx) => {
        await trx('users').update({ verified: true }).where({ id: req.user!.id });
        await trx('otps').delete().where({ user_id: req.user?.id });
    });

    return res.status(200).json({ success: true });
}];