import mongoose from "mongoose";

const maintenanceCategorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    expenseCategory: {
      type: String,
    },
    expenseType: {
      type: Number,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const MaintenanceCategory = mongoose.model("MaintenanceCategory", maintenanceCategorySchema);
export default MaintenanceCategory;
