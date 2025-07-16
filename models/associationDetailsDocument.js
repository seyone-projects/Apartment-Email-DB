import mongoose from "mongoose";
const { Schema, model } = mongoose;

const AssociationDetailDocumentSchema = new Schema(
    {
        associationDetailsId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "associationdetails",
        },
        bill: {
            type: String,
        },
        billName: {
            type: String,
        },
        billType: {
            type: String,
        },
        createdAt: {
            type: Date,
        },
        updatedAt: {
            type: Date,
        },
        isDeleted: {
            type: Boolean, default: false
        },
        deletedAt: {
            type: Date,
        },
        deletedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

AssociationDetailDocumentSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const AssociationDetailDocument = model("associationdetaildocument", AssociationDetailDocumentSchema);
export default AssociationDetailDocument;
