import mongoose from "mongoose";
const { Schema, model } = mongoose;

const notificationSchema = new Schema(
  {
    // notificationType: "",
    // notificationTo: "",
    // title: "",
    // date: "",
    // startTime: "",
    // endTime: "",
    // venue: "",
    // body: "",
    // emailType: "",
    // recurringFrequency: "",
    // recurringDay: "",
    // recurringDate: "",
    // specificDoors: [],

    notificationType: {
      type: String,
      required: [true, "Notification type is required"],
    },
    notificationTo: {
      type: String,
      required: [true, "Notification type is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    body: {
      type: String,
      required: [false, "Content is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    voting: {
      type: Boolean,
    },
    venue: {
      type: String,
    },
    blockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Block",
    },
    specificDoors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "flats",
      },
    ],
    emailType: {
      type: String,
      required: [true, "Email type is required"],
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    recurringFrequency: {
      type: String,
    },
    recurringDay: {
      type: [String],
    },
    recurringDate: {
      type: Date,
      default: null,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
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

const NotificationSchema = model("Notification", notificationSchema);
export default NotificationSchema;
