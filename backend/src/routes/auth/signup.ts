import type { Handler } from 'express';
import { z } from 'zod';
import knex from '../../database/connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { INVALID_PARAMETERS, EMAIL_EXIST, USERNAME_EXISTS } from '../../errors.js';

const signUpSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed")
        .transform((val) => val.toLowerCase()),

    email: z
        .email("Invalid email format")
        .toLowerCase(),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password must not be greater than 100 characters")
        .regex(/[A-Z]/, "Must include at least one uppercase letter")
        .regex(/[a-z]/, "Must include at least one lowercase letter")
        .regex(/[0-9]/, "Must include at least one number")
})


export const post: Handler = async (req, res) => {
    const body = signUpSchema.safeParse(req.body);

    if (!body.success) {
        return res.status(400).json({
            success: false,
            error: Object.assign(INVALID_PARAMETERS, { message: body.error.issues[0]?.message }),
        });
    }

    const { username, password, email } = body.data;


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
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, { expiresIn: '1h' })

    return res.status(201).json({
        success: true,
        message: 'User signed up successfully',
        data: { user: payload, token }
    });
};
