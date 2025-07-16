import mongoose from "mongoose";
const { Schema, model } = mongoose;

const materialLogSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "materialSubCategory",
      required: true,
    },
    fromQuantity: { type: Number }, // For updates
    toQuantity: { type: Number },   // For updates 
    quantity: { type: Number },     // For deletions
    type: {
      type: String,
      enum: ["purchase", "used", "purchase_update", "used_update", "purchase_delete", "used_delete"],
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

materialLogSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const MaterialHistoryLog = model("MaterialHistoryLog", materialLogSchema);
export default MaterialHistoryLog;
