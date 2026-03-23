import type { Handler } from 'express';
import { User } from '../../database/entity/User.js';
import { INVALID_PARAMETERS, INVALID_CREDENTIALS } from '../../errors.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const post: Handler = async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      error: INVALID_PARAMETERS
    });
  }

  const user = await User.findOne({
    select: ['email', 'id', 'password', 'username', 'verified'],
    where: { username }
  })

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

  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
    verified: user.verified
  }

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET_KEY!,
    { expiresIn: '1h' }
  );

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: { user: payload, token }
  });
};