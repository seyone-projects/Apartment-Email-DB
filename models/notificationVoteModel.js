import mongoose from "mongoose";
const { Schema, model } = mongoose;

const notificationVoteSchema = new Schema(
  {
    notificationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
    },
    status: {
      type: String,
      required: [true, "Status is required"],
    },
    createdAt: {
      type: Date,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

notificationVoteSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const NotificationVoteSchema = model("NotificationVote", notificationVoteSchema);
export default NotificationVoteSchema;
