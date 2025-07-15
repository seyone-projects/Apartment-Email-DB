import Joi from "joi";

export const vehicleSchema = Joi.object({
  type: Joi.string()
    .valid("Car", "Bike", "Truck", "Bus", "Other")
    .required()
    .messages({
      "any.only":
        "Vehicle type must be one of the following: Car, Bike, Truck, Bus, Other",
      "any.required": "Vehicle type is required",
    }),
  registrationNumber: Joi.string().required().messages({
    "string.empty": "Vehicle number is required",
    "any.required": "Vehicle number is required",
  }),
  parkingNumber: Joi.string().required().messages({
    "string.empty": "Parking number is required",
    "any.required": "Parking number is required",
  }),
  makeAndModel: Joi.string().required().messages({
    "string.empty": "Make and model are optional",
  }),
  recievedParkingSticker: Joi.string().optional(),
});

export const validateVehicle = (req, res, next) => {
  const { error } = vehicleSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details[0].message.replace(/"/g, ""),
    });
  }
  next();
};

export const updateVehicleSchema = Joi.object({
//   userId: Joi.string()
//     .regex(/^[0-9a-fA-F]{24}$/)
//     .required()
//     .messages({
//       "string.pattern.base": "Invalid user ID format",
//       "any.required": "User ID is required",
//     }),
  type: Joi.string()
    .valid("Car", "Bike", "Truck", "Bus", "Other")
    .optional()
    .messages({
      "any.only":
        "Vehicle type must be one of the following: Car, Bike, Truck, Bus, Other",
      "any.required": "Vehicle type is required",
    }),
  registrationNumber: Joi.string().messages({
    "string.empty": "Vehicle number is required",
    "any.required": "Vehicle number is required",
  }),
  parkingNumber: Joi.string().optional().messages({
    "string.empty": "Parking number is required",
    "any.required": "Parking number is required",
  }),
  makeAndModel: Joi.string().optional(),
  recievedParkingSticker: Joi.string().optional(),
});

export const validateUpdateVehicle = (req, res, next) => {
  const { error } = updateVehicleSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.details[0].message.replace(/"/g, ""),
    });
  }
  next();
};
