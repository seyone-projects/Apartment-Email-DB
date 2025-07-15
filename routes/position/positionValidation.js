import Joi from "joi";

export const positionValidationSchema = Joi.object({
    position: Joi.string().min(3).max(50).required().messages({
        "string.base": "position should be a type of text",
        "string.empty": "position cannot be empty",
        "string.min": "position should have a minimum length of 3",
        "string.max": "position should have a maximum length of 50",
        "any.required": "position is required"
    })
});

export const createPositionValidate = (req, res, next) => {
    try {
        const { error } = positionValidationSchema.validate(req.body, {
            abortEarly: true,
        });

        if (error) {
            return res.status(400).json({
                status: false,
                message: error.details[0].message.replace(/"/g, ""),
            });
        }

        next();
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Server-side issue",
        });
    }
}

export const updatePositionValidate = (req, res, next) => {
    try {
        const { error } = positionValidationSchema.validate(req.body, {
            abortEarly: true,
        });

        if (error) {
            return res.status(400).json({
                status: false,
                message: error.details[0].message.replace(/"/g, ""),
            });
        }

        next();
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Server-side issue",
        });
    }
}
