import mongoose from "mongoose";


const vendorSchema = new mongoose.Schema(
  {
    vendorName: {
      type: String,
      required: [true, "Vendor name is required"],
    },
    service: {
      type: String,
      required: [true, "Service is required"],
    },
    contactPerson: {
      type: String,
      required: [true, "Contact person is required"],    
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
    },
    emailId: {
      type: String,
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


const Vendor = mongoose.model("Vendor", vendorSchema);
export default Vendor;