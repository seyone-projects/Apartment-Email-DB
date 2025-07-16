import mongoose from "mongoose";
const { Schema, model } = mongoose;

const meetingSchema = new Schema({
    type: {
        type: String,
        required: [true, "Type is required"]
    },
    title: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: [100, "Name cannot exceed 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        maxlength: [500, "Description cannot exceed 500 characters"]
    },
    date: {
        type: Date,
        required: [true, "Date is required"]
    },
    startTime: {
        type: String,
        required: [true, "Start time is required"]
    },
    endTime: {
        type: String,
        required: [true, "End time is required"]
    },
    isVoting: {
        type: Boolean,
        required: [true, "Is voting is required"]
    },
    sendMail: {
        type: Boolean,
        required: [true, "Send mail is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });


meetingSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Meeting = model("meeting", meetingSchema);
export default Meeting;
