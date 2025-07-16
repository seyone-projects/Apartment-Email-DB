import mongoose from "mongoose";
const { Schema, model } = mongoose;

const maintenanceAMCSchema = new mongoose.Schema({
  maintenanceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MaintenanceExpense",
    required: true,
  },
  expenseNumber: {
    type: String,
    required: false,
  },
  expenseType: {
    type: String,
    required: false,
  },

  month: {
    type: String,
    required: true,
    match: /^\d{4}-\d{2}$/,
  },
  monthlyamount: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

maintenanceAMCSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const MaintenanceAMC = model("maintenanceAMC", maintenanceAMCSchema);
export default MaintenanceAMC;
