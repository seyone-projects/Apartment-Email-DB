import Joi from "joi";

export const createAssociationValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Association name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  gstNumber: Joi.string().required().messages({
    "string.empty": "GST number is required",
  }),
  address1: Joi.string().required().messages({
    "string.empty": "Address line 1 is required",
  }),
  address2: Joi.string().allow("").optional(),
  pincode: Joi.number().required().messages({
    "string.empty": "Pincode is required",
  }),
  state: Joi.string().required().messages({
    "string.empty": "State is required",
  }),
  city: Joi.string().required().messages({
    "string.empty": "City is required",
  }),
  registrationNumber: Joi.string().required().messages({
    "string.empty": "Registration number is required",
  }),
  pan: Joi.string().required().messages({
    "string.empty": "PAN is required",
  }),
  contactName: Joi.string().required().messages({
    "string.empty": "Contact name is required",
  }),
  contactNumber: Joi.number().required().messages({
    "string.empty": "Contact number is required",
  }),
  logo: Joi.string().required().messages({
    "string.empty": "Logo is required",
  }),
  moa: Joi.string().allow("").optional(),
  totalApartmentsqrtFt: Joi.number().required().messages({
    "number.base": "Total apartment square feet must be a number",
    "any.required": "Total apartment square feet is required",
  }),
});

export const updateAssociationValidationSchema = Joi.object({
  name: Joi.string().optional(),
  apartmentName: Joi.string().optional(),
  email: Joi.string().email().optional().messages({
    "string.email": "Invalid email format",
  }),
  gstNumber: Joi.string().optional(),
  address1: Joi.string().optional(),
  address2: Joi.string().allow("").optional(),
  pincode: Joi.number().optional(),
  state: Joi.string().optional(),
  city: Joi.string().optional(),
  registrationNumber: Joi.string().optional(),
  pan: Joi.string().optional(),
  contactName: Joi.string().optional(),
  contactNumber: Joi.number().optional(),
  logo: Joi.string().optional(),
  moa: Joi.string().allow("").optional(),
  totalApartmentsqrtFt: Joi.number().optional(),
});

export const validateCreateAssociation = (req, res, next) => {
  const { error } = createAssociationValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details.map((detail) => detail.message).join(", "),
    });
  }
  next();
};

export const validateUpdateAssociation = (req, res, next) => {
  const { error } = updateAssociationValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details.map((detail) => detail.message).join(", "),
    });
  }
  next();
};
