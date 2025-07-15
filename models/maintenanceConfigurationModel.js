import mongoose from "mongoose";
const { Schema, model } = mongoose;

const maintenanceConfigurationSchema = new Schema(
  {
    flatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "flats",
    },
    month: {
      type: String,
      required: [false, "Month is required"],
    },
    dueDate: {
      type: Date,
      required: [false, "Due date is required"],
    },
    type: {
      type: String,
      required: [false, "Month is required"],
    },
    amount: {
      type: Number,
      required: [false, "Amount is required"],
    },
    actualAmount: {
      type: Number,
      required: [false, "Amount is required"],
    },
    finalAmount: {
      type: Number,
      required: [false, "Amount is required"],
    },
    expense: {
      type: String,
      required: [false, "Expense is required"],
    },
    expenseNmber: {
      type: String,
      required: false,
    },
    gst: {
      type: Number,
      required: [false, "GST is required"],
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
      default: null,
    },
    orderId: {
      type: String,
      required: [false, "orderId is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    paymentType: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    deletedAt: {
      type: Date,
    },
    invoiceNumber: {
      type: String,
      required: [true, "Invoice number is required"],
    },
  },
  {
    timestamps: true,
  }
);

const maintenanceDataSchema = new Schema(
  {
    maintenanceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "maintenance",
    },
    grandTotal: {
      type: Number,
      required: [true, "Grand total is required"],
      min: [0, "Grand total cannot be negative"],
    },
    rateOfAmount: {
      type: Number,
      required: [true, "Rate of amount is required"],
      min: [0, "Rate of amount cannot be negative"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
  },
  {
    timestamps: true,
  }
);

const MaintenanceConfiguration = model(
  "maintenanceConfiguration",
  maintenanceConfigurationSchema
);
const MaintenanceData = model("maintenanceData", maintenanceDataSchema);

export { MaintenanceConfiguration, MaintenanceData };
