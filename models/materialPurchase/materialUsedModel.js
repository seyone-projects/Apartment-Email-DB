import mongoose from "mongoose";
const { Schema, model } = mongoose;

const materialUsedSchema = new Schema({
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'materialCategory', required: false },
    subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'materialSubCategory', required: false },
    stock: { type: Number, required: [false, "Stock is required"] },
    date: { type: Date, required: [false, "Date name is required"] },
    isDeleted: {
        type: Boolean, default: false
    },
    createdAt: {
        type: Date,
    },
    createdBy: {
        type: Date,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

materialUsedSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const MaterialUsed = model("MaterialUsed", materialUsedSchema);
export default MaterialUsed;
