import type { Handler } from 'express';
import knex from '../../database/connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { INVALID_PARAMETERS, EMAIL_EXIST, USERNAME_EXISTS } from '../../errors.js';

export const post: Handler = async (req, res) => {
    const { username, password, email } = req.body || {};

    if (!username || !password || !email) {
        return res.status(400).json({
            success: false,
            error: INVALID_PARAMETERS
        });
    }

    /* Check if the email is unique */
    if (await knex('users').where({ email }).first()) {
        return res.status(400).json({
            success: false,
            error: EMAIL_EXIST
        });
    }

    /* Check if the username is unique */
    if (await knex('users').where({ username }).first()) {
        return res.status(400).json({
            success: false,
            error: USERNAME_EXISTS
        });
    }

    const [userId] = await knex('users').insert({
        username,
        password: await bcrypt.hash(password, 10),
        email,
        verified: false
    });

    const payload = { id: userId, username, email, verified: false }
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, { expiresIn: '1h'})

    return res.status(201).json({
        success: true,
        message: 'User signed up successfully',
        data: { user: payload, token }
    });
};
