import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userDocumentSchema = new Schema(
  {
    constructionAgreement: {
      type: String,
      required: [true, "Construction Agreement is required"],
    },
    saleDeedPage1: {
      type: String,
      required: [true, "sale Deed Page is required"],
    },
    parkingLetter: {
      type: String,
      required: [false, "Parking Letter is required"],
    },
    idtype: { type: String, required: [true, "ID type is required"] },
    idproof: { type: String, required: [true, "ID proof is required"] },
    visibility: { type: Boolean },
    createdAt: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
); 

userDocumentSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Document = model("UserDocument", userDocumentSchema);
export default Document;
