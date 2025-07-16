import mongoose from "mongoose";
const { Schema, model } = mongoose;

const GallerySchema = new Schema(
  {
    galleryTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GalleryType",
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    photos: [
      {
        url: { type: String },
        isWebsite: { type: Boolean, default: false },
      },
    ],
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
    galleryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "gallerydocuments",
    },
  },
  {
    timestamps: true,
  }
);

GallerySchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Gallery = model("Gallery", GallerySchema);

export default Gallery;
