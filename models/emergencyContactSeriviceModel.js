
import mongoose from "mongoose";

const emergencyContactServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
    },
    isDailyBasis:{
        type: Boolean,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);


const EmergencyContactService = mongoose.model(
  "EmergencyContactService",
  emergencyContactServiceSchema
);


export default EmergencyContactService;
