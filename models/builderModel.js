import mongoose from "mongoose";
const { Schema, model } = mongoose;

const buildersSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Email is invalid"],
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    contactPerson: {
      type: String,
      required: [true, "Contact person is required"],
      trim: true,
    },
    contactNumber1: {
      type: String,
      required: [true, "Contact number 1 is required"],
      match: [/^\d{10}$/, "Contact number 1 must be 10 digits"],
    },
    contactNumber2: {
      type: String,
      required: [false, "Contact number 2 is required"],
      match: [/^\d{10}$/, "Contact number 2 must be 10 digits"],
    },
    projectName: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },
    expectedHandoverDate: {
      type: Date,
      required: [true, "Handover date is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    totalApartmentsqrtFt: {
      type: String,
      required: [true, "Total Apartment Sqrt Ft is required"],
      trim: true,
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
      match: [/^\d{6}$/, "Pincode must be 6 digits"],
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: "city",
      required: [true, "City is required"],
    },
    state: {
      type: Schema.Types.ObjectId,
      ref: "State",
      required: [true, "State is required"],
    },
    logo: {
      type: String,
      required: [true, "Logo is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
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

buildersSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const BuildersSchema = model("Builders", buildersSchema);
export default BuildersSchema;
