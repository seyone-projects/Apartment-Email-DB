import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ledgerLogSchema = new mongoose.Schema({
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  type: {
    type: String,
    enum: ["debit", "credit", "maintenance", "amenity"],
    required: true,
  },
  ledgerMode: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  balanceAfter: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    default: "",
  },
  date:{
    type: Date,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  lastActivity: {
    type: Date,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

ledgerLogSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const LedgerLog = model("ledgerLog", ledgerLogSchema);
export default LedgerLog;
