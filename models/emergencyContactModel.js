import mongoose from "mongoose";

const emergencyContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmergencyContactService",
      required: [true, "Service ID is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    aadhar: {
      type: String,
      default: null,
      validate: {
        validator: function (v) {
          return !v || /^(http|https):\/\/[^ "]+$/.test(v);
        },
        message: "Invalid Aadhar URL format",
      },
    },

    photo: {
      type: String,
      validate: {
        validator: function (v) {
          return !v || /^(http|https):\/\/[^ "]+$/.test(v);
        },
        message: "Invalid photo URL format",
      },
    },

    isDailyBasis: {
      type: Boolean,
      default: false,
    },
    isValidated: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "CreatedBy is required"],
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const EmergencyContact = mongoose.model(
  "EmergencyContact",
  emergencyContactSchema
);

export default EmergencyContact;
