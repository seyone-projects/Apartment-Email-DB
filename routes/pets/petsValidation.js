import Joi from "joi";

export const petSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Pet name is required",
    "any.required": "Pet name is required",
  }),
  petType: Joi.string()
    .valid("Dog", "Cat", "Bird", "Fish", "Reptile", "Other")
    .required()
    .messages({
      "any.only":
        "Pet type must be one of the following: Dog, Cat, Bird, Fish, Reptile, Other",
      "any.required": "Pet type is required",
    }),
  identityMarks: Joi.string().required().messages({
    "string.empty": "Identity marks are required",
    "any.required": "Identity marks are required",
  }),
  isVaccinated: Joi.boolean().required().messages({
    "boolean.base": "Vaccination status must be a boolean",
    "any.required": "Vaccination status is required",
  }),
  comments: Joi.string().required().messages({
    "string.empty": "Comments are required",
    "any.required": "Comments are required",
  }),
  breed: Joi.string().required().messages({
    "string.empty": "Breed is required",
    "any.required": "Breed is required",
  }),
  age: Joi.number().min(0).required().messages({
    "number.base": "Age must be a number",
    "number.min": "Age must be at least 0",
    "any.required": "Age is required",
  }),
  weight: Joi.number().min(0).required().messages({
    "number.base": "Weight must be a number",
    "number.min": "Weight must be at least 0",
    "any.required": "Weight is required",
  }),
  color: Joi.string().required().messages({
    "string.empty": "Color is required",
    "any.required": "Color is required",
  }),
});

export const validatePet = (req, res, next) => {
  const { error } = petSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details[0].message.replace(/"/g, ""),
    });
  }
  next();
};

export const updatePetSchema = Joi.object({
  userId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional()
    .messages({
      "string.pattern.base": "Invalid user ID format",
    }),
  name: Joi.string().optional().messages({
    "string.empty": "Pet name is required",
  }),
  petType: Joi.string()
    .valid("Dog", "Cat", "Bird", "Fish", "Reptile", "Other")
    .optional()
    .messages({
      "any.only":
        "Pet type must be one of the following: Dog, Cat, Bird, Fish, Reptile, Other",
    }),
  identityMarks: Joi.string().optional().messages({
    "string.empty": "Identity marks are optional",
  }),
  isVaccinated: Joi.boolean().optional().messages({
    "boolean.base": "Vaccination status must be a boolean",
  }),
  comments: Joi.string().optional(),
  breed: Joi.string().optional(),
  age: Joi.number().min(0).optional(),
  weight: Joi.number().min(0).optional(),
  color: Joi.string().optional(),
});

export const validateupdatePet = (req, res, next) => {
  const { error } = updatePetSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details[0].message.replace(/"/g, ""),
    });
  }
  next();
};
