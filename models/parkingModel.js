import { timeStamp } from "console";
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const parkingSchema = new Schema(
  {
    flatId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Flat Id is Required"],
      ref: "Flat",
    },
    slotNo: {
      type: Number,
      required: [true, "Slot Number is Required"],
      validate: {
        validator: function (value) {
          return !isNaN(value);
        },
        message: "Slot number must be a valid number.",
      },
    },
    floor: {
      type: String,
      required: [true, "Floor is Required"],
    },
    type: {
      type: String,
      required: [true, "Type is Required"],
    },
    location: {
      type: String,
      required: [false, "Location is Required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

parkingSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Parking = model("parking", parkingSchema);
export default Parking;
