import Joi from "joi";

export const familyMemberSchema = Joi.object({
    userId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            "any.required": "User Id is required",
            "string.empty": "User Id cannot be empty",
        }),
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            "any.required": "Name is required",
            "string.empty": "Name cannot be empty",
            "string.min": "Name must be at least 2 characters long",
            "string.max": "Name can't exceed 50 characters",
        }),
    age: Joi.number()
        .min(0)
        .max(150)
        .optional()
        .messages({
            "number.min": "Age can't be negative",
            "number.max": "Age can't exceed 150 years",
        }),
    bloodGroup: Joi.string().optional(),
    isCoOwner: Joi.string().optional(),
    relationshipType: Joi.string().optional(),
    mobile: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .optional()
        .messages({
            "string.pattern.base": "Mobile number must be a valid 10-digit number",
        }),
    email: Joi.string()
        .email()
        .optional()
        .messages({
            "string.email": "Email address must be valid",
        }),
});
export const validateFamilyMember = (req, res, next) => {
    try {
        const { error } = familyMemberSchema.validate(req.body, {
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

export const familyMemberUpdateSchema = Joi.object({
    userId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional()
        .messages({
            "any.required": "User Id is required",
            "string.empty": "User Id cannot be empty",
        }),
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .optional()
        .messages({
            "string.empty": "Name cannot be empty",
            "string.min": "Name must be at least 2 characters long",
            "string.max": "Name can't exceed 50 characters",
        }),
    age: Joi.number()
        .min(0)
        .max(150)
        .optional()
        .messages({
            "number.min": "Age can't be negative",
            "number.max": "Age can't exceed 150 years",
        }),
    bloodGroup: Joi.string().optional(),
    isCoOwner: Joi.string().optional(),
    relationshipType: Joi.string().optional(),
    mobile: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .optional()
        .messages({
            "string.pattern.base": "Mobile number must be a valid 10-digit number",
        }),
    email: Joi.string()
        .email()
        .optional()
        .messages({
            "string.email": "Email address must be valid",
        }),
});
export const validateFamilyMemberUpdate = (req, res, next) => {
    try {
        const { error } = familyMemberUpdateSchema.validate(req.body, {
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