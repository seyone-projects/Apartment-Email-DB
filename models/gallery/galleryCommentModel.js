import mongoose from "mongoose";
const { Schema, model } = mongoose;

const GalleryCommentSchema = new Schema(
  {
    galleryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gallery",
    },
    comment: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

GalleryCommentSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const GalleryComment = model("GalleryComment", GalleryCommentSchema);

export default GalleryComment;
