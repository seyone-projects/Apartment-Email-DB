import mongoose from "mongoose";
const { Schema, model } = mongoose;

const paymentSchema = new Schema(
  {
    maintenanceId: {
      type: String,
      required: [false, "Maintenance id is required"],
    },
    amenityId: {
      type: String,
      required: [false, "Amenity id is required"],
    },
    paymentId: {
      type: String,
      required: [true, "Payment id is required"],
    },
    orderId: {
      type: String,
      required: [true, "Order id is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    status: {
      type: Boolean,
      required: [true, "Status is required"],
    },
    message: {
      type: Boolean,
      required: [false, "Message is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

paymentSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Payment = model("payment", paymentSchema);

export default Payment;
