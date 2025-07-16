import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ecmcPositionSchema = new Schema({
    name: { type: String, required: [true, "Position name is required"] },
    createdAt: {
        type: Date,
    },
    createdBy: {
        type: Date,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

ecmcPositionSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const PositionSchema = model("ecmcPositionSchema", ecmcPositionSchema);
export default PositionSchema;
