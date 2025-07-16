import mongoose from "mongoose";
const { Schema, model } = mongoose;

const nominationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    flatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flat",
      required: true,
    },
    blockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Block",
      required: true,
    },
    sameAsOwner: {
      type: Boolean,
    },
    profile: {
      type: String,
    },
    attachments: [{ type: String }],
    signature: {
      type: String,
      required: false,
    },
    behalfName: {
      type: String,
      required: false,
    },
    behalfEmail: {
      type: String,
      required: false,
    },
    behalfPhone: {
      type: String,
      required: true,
    },
    behalfProfile: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
      required: true,
    },
    onBehalf: {
      type: Boolean,
      default: false,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    electionId: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Verified",
        "Approved",
        "Rejected",
        "Resubmitted",
        "Withdrawn",
      ],
      default: "Pending",
    },
    rejectionReason: {
      type: String,
    },
    resubmitted: {
      type: Boolean,
      default: false,
    },
    resubmissionCount: {
      type: Number,
      default: 0,
    },
    lastResubmissionDate: {
      type: Date,
    },
    history: [
      {
        status: { type: String },
        changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        changedAt: { type: Date, default: Date.now },
        comments: { type: String },
      },
    ],
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
nominationSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const nomination = model("Nomination", nominationSchema);

export default nomination;

