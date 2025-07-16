import mongoose from "mongoose";
const { Schema, model } = mongoose;

const notificationSchema = new Schema(
  {
    icon: { type: String },
    type: { type: String, required: true },
    heading: { type: String, required: true },
    shortDesc: { type: String, required: true },
    isPicked: { type: Boolean, default: false },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    receivers: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: { type: String },
        read: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

notificationSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Notification = model("popNotification", notificationSchema);

export default Notification;
