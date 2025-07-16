import mongoose from "mongoose";
const { Schema, model } = mongoose;

const associationSchema = new Schema(
    {
        apartmentName:{
             type: String,
            required: [true, "Apartment Name is required"],
        },
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
        },
        gstNumber: {
            type: String,
            required: [true, "GST Number is required"],
        },
        address1: {
            type: String,
            required: [true, "Address is required"],
        },
        address2: {
            type: String,
            required: [false, "Address is required"],
        },
        registrationNumber: {
            type: String,
            required: [true, "Registration number is required"],
        },
        pan: {
            type: String,
            required: [true, "PAN number is required"],
            match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"], // Example PAN validation: ABCDE1234F
            minlength: [10, "PAN number must be at least 10 characters"],
            maxlength: [10, "PAN number must not exceed 10 characters"]
        },
        contactName: {
            type: String,
            required: [true, "Contact name is required"],
            minlength: [3, "Contact name must be at least 3 characters"],
            maxlength: [50, "Contact name must not exceed 50 characters"],
        },
        contactNumber: {
            type: String,
            required: [true, "Contact number is required"],
            match: [/^[0-9]{10}$/, "Invalid contact number format"], // Validates 10-digit numbers
        },
        pincode:{
            type: String,
            required: [true, "Pincode is required"],
        },
        moa: {
            type: String, required: [false, "MOA is required"],
            maxlength: [5000, "MOA can't exceed 5000 characters"]
        },
        logo:{
            type: String,
        },
        totalApartmentsqrtFt:{ 
            type: Number,
            required: [true, "Visibility is required"],
        },
        state:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "State",
        },
        city:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "city",
        },
        logoName: {
            type: String,
        },
        logoType:{
            type: String,
        },
        createdBy: {
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

associationSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Association = model("association", associationSchema);
export default Association;
