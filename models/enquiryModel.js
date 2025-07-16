import mongoose from "mongoose";
const { Schema, model } = mongoose;

const enquirySchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: [100, "Name cannot exceed 100 characters"]
    },
    mobile: {
        type: String,
        required: [true, "Mobile number is required"],
        trim: true,
        validate: {
            validator: function (v) {
                return /^[0-9]{10}$/.test(v);
            },
            message: "Mobile number must be a valid 10-digit number"
        }
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: "Please enter a valid email address"
        }
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        maxlength: [500, "Description cannot exceed 500 characters"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });


enquirySchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Enquiry = model("enquiry", enquirySchema);
export default Enquiry;
