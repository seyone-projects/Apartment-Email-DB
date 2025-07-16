import mongoose from "mongoose";
const { Schema, model } = mongoose;

const sellerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile is required"],
    },
    photo: {
      type: String,
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

sellerSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const SellerProfile = model("SellerProfile", sellerSchema);
export default SellerProfile;
