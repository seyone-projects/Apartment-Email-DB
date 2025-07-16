import mongoose from "mongoose";
const { Schema, model } = mongoose;

const GalleryLikesSchema = new Schema(
  {
    galleryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gallery",
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

GalleryLikesSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const GalleryLikes = model("GalleryLikes", GalleryLikesSchema);

export default GalleryLikes;
