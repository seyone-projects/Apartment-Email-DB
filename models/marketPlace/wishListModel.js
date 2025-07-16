import mongoose from "mongoose";
const { Schema, model } = mongoose;

const wishListSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  marketPlaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MarketPlace",
  },

  createdAt: {
    type: Date,
  },
});

wishListSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

wishListSchema.set("autoIndex", true);

const wishList = model("marketplaceWishList", wishListSchema);

export default wishList;
