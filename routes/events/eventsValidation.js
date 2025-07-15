import Joi from "joi";

export const eventSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required.",
    "any.required": "Title is required.",
  }),

  endDateTime: Joi.string().required().messages({
    "string.empty": "endDateTime is required.",
  }),
  endTime: Joi.string().required().messages({
    "string.empty": "End Time is required.",
  }),

  startDateTime: Joi.string().required().messages({
    "string.empty": "End Date Time is required.",
  }),
  startTime: Joi.string().required().messages({
    "string.empty": "Start Time is required.",
  }),

  description: Joi.string().required().messages({
    "string.empty": "Description is required.",
    "any.required": "Description is required.",
  }),
  startDate: Joi.date().iso().required().messages({
    "date.base": "Start date must be a valid date.",
    "date.format": "Start date must be in ISO format.",
    "any.required": "Start date is required.",
  }),
  endDate: Joi.date().iso().greater(Joi.ref("startDate")).required().messages({
    "date.base": "End date must be a valid date.",
    "date.format": "End date must be in ISO format.",
    "date.greater": "End date must be greater than start date.",
    "any.required": "End date is required.",
  }),
});

export const eventUpdateSchema = Joi.object({
  title: Joi.string().optional().messages({
    "string.empty": "Title cannot be empty.",
  }),
  description: Joi.string().optional().messages({
    "string.empty": "Description cannot be empty.",
  }),
  startDate: Joi.date().iso().optional().messages({
    "date.base": "Start date must be a valid date.",
    "date.format": "Start date must be in ISO format.",
  }),
  startTime: Joi.string().optional().messages({
    "string.empty": "Start time cannot be empty.",
  }),
  startDateTime: Joi.string().optional().messages({
    "string.empty": "Start date time cannot be empty.",
  }),
  endDateTime: Joi.string().optional().messages({
    "string.empty": "End date time cannot be empty.",
  }),
  endTime: Joi.string().optional().messages({
    "string.empty": "End time cannot be empty.",
  }),
  endDate: Joi.date().iso().greater(Joi.ref("startDate")).optional().messages({
    "date.base": "End date must be a valid date.",
    "date.format": "End date must be in ISO format.",
    "date.greater": "End date must be greater than start date.",
  }),
});

export const validateEvent = (req, res, next) => {
  const { error } = eventSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message.replace(/"/g, ""),
    });
  }
  next();
};

export const validateEventUpdate = (req, res, next) => {
  const { error } = eventUpdateSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message.replace(/"/g, ""),
    });
  }
  next();
};
