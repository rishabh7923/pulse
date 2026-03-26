import { z } from "zod";
import { INVALID_PARAMETERS } from "../../errors.js";

export const validateCommentId = (req, res, next) => {
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
}