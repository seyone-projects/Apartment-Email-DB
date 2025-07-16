import mongoose from "mongoose";
const { Schema, model } = mongoose;

const vehicleDetailsSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    registrationNumber: {
      type: String,
      trim: true,
      unique: true,
    },
    makeAndModel: {
      type: String,
      required: [true, "Make and Model is required"],
    },
    parkingNumber: {
      type: String,
      required: [true, "Parking Number is required"],
    },

    recievedParkingSticker: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

vehicleDetailsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const VehicleDetails = model("vehicleDetails", vehicleDetailsSchema);

export default VehicleDetails;
