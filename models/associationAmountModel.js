import mongoose from "mongoose";
const { Schema, model } = mongoose;

const associationAmountSchema = new Schema(
  {
    accountBalance: {
      type: Number,
      required: [true, "Account balance is required"],
      validate: {
        validator: function (v) {
          return !isNaN(v);
        },
        message: (props) => `${props.value} is not a valid number!`,
      },
    },
    initialAccountBalance: {
      type: Number,
      required: [false, "Initial Account Balanace is Required"],
    },
    currentBalanceVisible: {
      type: Boolean,
    },
    isPettyCashLow: {
      type: Boolean,
      default: false,
    },
    pettyCash: {
      type: Number,
      default: 0,
      required: [true, "Petty cash is required"],
      validate: {
        validator: function (v) {
          return !isNaN(v);
        },
        message: (props) => `${props.value} is not a valid number!`,
      },
    },
    corpusAmount: {
      type: Number,
      required: [false, "Corpus amount is required"],
      min: [0, "Corpus amount cannot be negative"], // Ensure it's not negative
      validate: {
        validator: function (v) {
          return typeof v === "number" && !isNaN(v) && v >= 0;
        },
        message: (props) => `${props.value} is not a valid corpus amount!`,
      },
    },

    bankAccountNo: {
      type: String,
    },
    bankName: {
      type: String,
    },
    branchName: {
      type: String,
    },
    ifsc: {
      type: String,
    },
    bankAddress: {
      type: String,
    },
    pettyCashLimitAmount: {
      type: Number,
    },
    isCreated: {
      type: Boolean,
    },
    // includeInBalance: {
    //   type: Boolean,
    //   required: [true, "Options are required"],
    // },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
  },
  {
    timestamps: true,
  }
);

associationAmountSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const AssociationAmount = model("associationamount", associationAmountSchema);
export default AssociationAmount;
