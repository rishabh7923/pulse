import type { Handler } from 'express';
import knex from '../../database/connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { INVALID_PARAMETERS, INVALID_CREDENTIALS } from '../../errors.js';

export const post: Handler = async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      error: INVALID_PARAMETERS
    });
  }

  const user = await knex('users')
    .select('*')
    .where({ username })
    .first();

  if (!user) {
    return res.status(400).json({
      success: false,
      error: INVALID_CREDENTIALS
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      error: INVALID_CREDENTIALS
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      verified: user.verified
    },
    process.env.JWT_SECRET_KEY!,
    { expiresIn: '1h' }
  );

  return res.status(200).json({ success: true, token });
};
