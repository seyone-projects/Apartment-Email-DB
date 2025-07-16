import mongoose from "mongoose";
const { Schema, model } = mongoose;

const guestParkingSchema = new Schema(
    {
        slotNo: {
            type: String,
            required: [true, "Slot No is required"],
        },
        location: {
            type: String,
            required: [true, "Location is required"],
        },
        area: {
            type: String,
            required: [true, "Parking area is required"],
        },
        remarks: {
            type: String,
            required: [true, "Remarks is required"],
        },
        createdAt: {
            type: Date,
        },
        createdBy: {
            type: Date,
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

guestParkingSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const GuestParking = model("GuestParking", guestParkingSchema);
export default GuestParking;
