import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ChatSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
    },

    createdAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

ChatSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Chats = model("chat", ChatSchema);

export default Chats;
