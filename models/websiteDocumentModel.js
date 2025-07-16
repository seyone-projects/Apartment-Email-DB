import mongoose from "mongoose";
const { Schema, model } = mongoose;

const WebsiteDocumentSchema = new Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
    type: {
      type: String,
    },
    field: {
      type: String,
    },
    documentName: {
      type: String,
    },
    documentPath: {
      type: String,
    },
    documentType: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

WebsiteDocumentSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const WebsiteDocument = model("WebsiteDocument", WebsiteDocumentSchema);

export default WebsiteDocument;
