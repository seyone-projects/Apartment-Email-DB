import mongoose from "mongoose";
const { Schema, model } = mongoose;

const MaterialUsedHistorySchema = new Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "materialCategory",
      required: false,
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "materialSubCategory",
      required: false,
    },
    quantity: { type: Number, required: [false, "Quantity is required"] },
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

MaterialUsedHistorySchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const MaterialUsedHistory = model(
  "MaterialUsedHistory",
  MaterialUsedHistorySchema
);
export default MaterialUsedHistory;
