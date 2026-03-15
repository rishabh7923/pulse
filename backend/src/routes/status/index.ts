import type { Handler } from "express";

export const get: Handler[] = [
    (req, res) => {
        return res.status(200).json({ status: "OK" })
    }
]