import mongoose from "mongoose";
const { Schema, model } = mongoose;

const notificationSummarySchema = new Schema(
    {
        notificationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'notifications',
            required: true
        },
        date: {
            type: Date,
            required: [true, "Date is required"],
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

notificationSummarySchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const NotificationSummarySchema = model("NotificationSummary", notificationSummarySchema);
export default NotificationSummarySchema;
