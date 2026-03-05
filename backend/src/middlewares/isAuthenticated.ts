import express from "express"
import jwt from "jsonwebtoken"

import { UNAUTHORIZED } from "../errors.js";

export const isAuthenticated = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ success: false, error: UNAUTHORIZED });
    }

    if (!jwt.verify(token, process.env.JWT_SECRET_KEY!)) {
        return res.status(401).json({ success: false, error: UNAUTHORIZED });
    }

    next();
}