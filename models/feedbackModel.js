import mongoose from "mongoose";
const { Schema, model } = mongoose;

const feedbackSchema = new Schema(
  {
    description: { type: String, required: [true, "Description is required"] },
    title: { type: String, required: [true, "Title is required"] },
    status: {
      type: Boolean,
      default: false,
      required: [true, "Status is required"],
    },
    createdAt: {
      type: Date,
    },
    createdBy: {
      type: Date,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

feedbackSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Feedback = model("Feedback", feedbackSchema);
export default Feedback;
