import mongoose from "mongoose";
const { Schema, model } = mongoose;

const MarketplaceDocumentSchema = new Schema(
  {
    marketPlaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MarketPlace",
      required: true,
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
    fileType: {
      type: String,
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

MarketplaceDocumentSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const MarketPlaceDocument = model(
  "MarketplaceDocument",
  MarketplaceDocumentSchema
);

export default MarketPlaceDocument;
