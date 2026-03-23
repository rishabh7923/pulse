import type { Handler } from 'express';
import { isAuthenticated } from '../../../middlewares/isAuthenticated.js';
import { MoreThan } from 'typeorm';

import DataSource from '../../../database/connection.js'
import { Otp } from '../../../database/entity/Otp.js';
import { User } from '../../../database/entity/User.js';

export const post: Handler[] = [isAuthenticated, async (req, res) => {
    const otp = req.body.otp;
    if (!otp || otp.length != 6 || isNaN(otp))
        return res.status(400).end();

    if (
        !await Otp.findOneBy({
            user_id: req.user.id,
            otp,
            expires_at: MoreThan(new Date())
        })
    ) return res.status(401).end();

    await DataSource.manager.transaction(async (manager) => {
        await manager.update(User, { id: req.user.id }, { verified: true });
        await manager.delete(Otp, { user_id: req.user.id })
    })

    return res.status(204).end();
}];