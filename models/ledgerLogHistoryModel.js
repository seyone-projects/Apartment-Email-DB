import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ledgerLogHistorySchema = new mongoose.Schema({
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  ledgerLogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ledgerLog",
  },
  type: {
    type: String,
    enum: ["debit", "credit", "maintenance"],
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
  balanceBefore: {
    type: Number,
  },
  balanceAfter: {
    type: Number,
  },
  name: {
    type: String,
    default: "",
  },
  oldEntry:{
    type: Number,    
  },
  newEntry:{
    type: Number,
  },
  oldBalance:{
    type: Number,
  },
  newBalance:{
     type: Number,
  },
  differentAmount:{
    type: Number,
  },
  oldData: {
    type: Object,
  },
  newData: {
    type: Object,
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

ledgerLogHistorySchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const LedgerLogHistory = model("ledgerLogHistory", ledgerLogHistorySchema);
export default LedgerLogHistory;
