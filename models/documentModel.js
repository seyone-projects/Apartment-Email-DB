import mongoose from "mongoose";
const { Schema, model } = mongoose;

const documentSchema = new Schema({
    documentName: { type: String, required: [true, "Document name is required"] },
    customDocumentName: { type: String, required: [false, "Document name is required"] },
    description: { type: String, required: [true, "Description is required"] },
    date: { type: Date, required: [true, "Date is required"] },
    status: { type: Boolean, default: true, required: [true, "Status is required"] },
    visibleToMember: { type: Boolean, required: [true, "Status is required"] },
    createdAt: {
        type: Date,
    },
    createdBy: {
        type: Date,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

documentSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Document = model("Document", documentSchema);
export default Document;
