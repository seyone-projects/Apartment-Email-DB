import mongoose from "mongoose";
const { Schema, model } = mongoose;

const materialSubCategorySchema = new Schema(
  {
    materialCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "materialCategory",
    },
    name: { type: String, required: [true, "Amenity type is required"] },
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

materialSubCategorySchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const MaterialSubCategory = model(
  "materialSubCategory",
  materialSubCategorySchema
);
export default MaterialSubCategory;
