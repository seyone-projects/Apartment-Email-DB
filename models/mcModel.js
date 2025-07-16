import mongoose from "mongoose";
const { Schema, model } = mongoose;

const MCSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    selectedType: {
      type: String,
    },
    asOwner: {
      type: Boolean,
    },
    bname: {
      type: String,
    },
    bemail: {
      type: String,
    },
    bmobile: {
      type: String,
    },
    position: {
      type: String,
    },
    assignedArea: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    photo: {
      type: String,
    },
    permissions: [
      {
        index: Number,
        read: Boolean,
        write: Boolean,
        page: String,
        title: String,
        status: Boolean,
      },
    ],

    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

MCSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const MC = model("MC", MCSchema);

export default MC;
