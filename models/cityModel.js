import mongoose from "mongoose";
const { Schema, model } = mongoose;

const citySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "State name is required"],
        },
        status: {
            type: Boolean,
            default: true,
        },
        stateId: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
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

citySchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const City = model("city", citySchema);
export default City;
