import type { Handler } from 'express';
import knex from '../../../database/connection.js';
import { OTP_ALREADY_SENT, OTP_SEND_FAILED } from '../../../errors.js';
import { isAuthenticated } from '../../../middlewares/isAuthenticated.js';
import { generateOTP, sendOTPMail } from '../../../utils.js';

export const post: Handler[] = [isAuthenticated, async (req, res) => {
    const user = req.user!;

    if (
        await knex('otps')
            .where({ user_id: user.id })
            .andWhere('expires_at', '>', knex.fn.now())
            .first()
    ) return res.status(429).json({ success: false, error: OTP_ALREADY_SENT })

    const otp = generateOTP(6);
    const success = await sendOTPMail(user.email, otp);

    if (!success) {
        return res.status(500).json({ success: false, error: OTP_SEND_FAILED })
    }

    await knex('otps').upsert({
        user_id: user.id,
        otp: otp,
        expires_at: new Date(Date.now() + (3 * 60 * 1000)),
        created_at: new Date()
    })

    return res.status(204).end();
}];