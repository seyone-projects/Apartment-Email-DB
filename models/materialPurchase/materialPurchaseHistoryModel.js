import mongoose from "mongoose";
const { Schema, model } = mongoose;

const MaterialHistorySchema = new Schema({
    subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'materialSubCategory', required: false },
    quantity: { type: Number, required: [false, "Quantity is required"] },
    createdAt: {
        type: Date,
    },
    createdBy: {
        type: Date,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

MaterialHistorySchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const MaterialHistory = model("MaterialHistory", MaterialHistorySchema);
export default MaterialHistory;
