import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Speeds up queries
    },
    electionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Election",
      required: true,
      index: true,
    },
    nomineeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nominee",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

voteSchema.index({ userId: 1, electionId: 1 }, { unique: true });

export default mongoose.model("Vote", voteSchema);
