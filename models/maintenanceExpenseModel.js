import mongoose from "mongoose";
const { Schema, model } = mongoose;
import {
  EXPENSE_TYPE_DYNAMIC,
  EXPENSE_TYPE_STATIC,
  EXPENSE_TYPE_AMC,
} from "../constants/expenseType.js";

const MaintenanceExpenseSchema = new Schema(
  {
    months: {
      type: [String],
      required: true,
    },
    // frequency: {
    //   type: String,
    //   // enum: ["monthly", "quarterly", "halfYearly", "annually"],
    //   // required: function () {
    //   //   return this.expenseType === "amc";
    //   // },
    //   // default: undefined,
    // },

    frequencyMonth: {
      type: String,
      required: false,
    },
    expenseNumber: {
      type: String,
      required: false,
    },
    expenseType: {
      type: String,
      required: [true, "Maintenance type is required"],
      enum: [EXPENSE_TYPE_DYNAMIC, EXPENSE_TYPE_STATIC, EXPENSE_TYPE_AMC],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    // amcDatas: [
    //   {
    //     month: {
    //       type: String,
    //       required: true,
    //     },
    //     monthlyamount: {
    //       type: Number,
    //       required: true,
    //     },
    //     expenseNmber: {
    //       type: String,
    //       required: false,
    //     },
    //   },
    // ],
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount must be a positive number"],
    },
    remarks: {
      type: String,
      required: [true, "Remarks is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const maintenanceSummarySchema = new Schema(
  {
    totalExpenses: {
      type: Number,
      required: [true, "Total expenses is required"],
      min: [0, "Total expenses cannot be negative"],
    },
    ratePerSquareFeet: {
      type: Number,
      required: [true, "Rate per square feet is required"],
      min: [0, "Rate per square feet cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

const MaintenanceExpense = model(
  "MaintenanceExpense",
  MaintenanceExpenseSchema
);
const MaintenanceSummary = model(
  "MaintenanceSummary",
  maintenanceSummarySchema
);

MaintenanceExpenseSchema.index({ months: 1 });
MaintenanceExpenseSchema.index({ "amcDatas.month": 1 });
MaintenanceExpenseSchema.index({ expenseNumber: 1 });

export { MaintenanceExpense, MaintenanceSummary };
