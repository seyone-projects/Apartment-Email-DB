// models/FailedEmail.js
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const FailedEmailSchema = new Schema(
  {
    to: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    attachments: {
      type: Array,
      default: [],
    },
    error: {
      type: Object,
      required: true,
    },
    association: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Association",
    },
    retryCount: {
      type: Number,
      default: 0,
    },
    lastAttempt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

FailedEmailSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const FailedEmailLog = model("FailedEmailLog", FailedEmailSchema);

export default FailedEmailLog;
