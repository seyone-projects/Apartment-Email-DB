import mongoose from "mongoose";

const { Schema, model } = mongoose;

const BookingSchema = new Schema(
  {
    amenityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Amenity",
      required: true,
    },
    bookingStartDate: { type: Date, required: true },
    amenityType: { type: String, required: true }, // Full Day | Half Day | Hourly
    startTime: { type: String }, // HH:mm format
    endTime: { type: String },
    timeSlot: { type: String }, // Morning | Afternoon for Half Day
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    totalFee: { type: Number, required: true },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
      default: null,
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
    cancelledAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

BookingSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id; // Rename _id to id for better API response
  return object;
});

const AminityBooking = model("AminityBooking", BookingSchema);
export default AminityBooking;
