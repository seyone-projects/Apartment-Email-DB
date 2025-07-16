import mongoose from "mongoose";
const { Schema, model } = mongoose;

const materialCategorySchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
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

materialCategorySchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const MaterialCategory = model("materialCategory", materialCategorySchema);
export default MaterialCategory;
