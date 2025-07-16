import mongoose from "mongoose";
const { Schema, model } = mongoose;

const stateSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "State name is required"],
        },
        status: {
            type: Boolean,
            default: true,
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

stateSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const State = model("State", stateSchema);
export default State;
