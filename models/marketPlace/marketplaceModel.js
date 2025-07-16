import mongoose from "mongoose";
const { Schema, model } = mongoose;

const marketSchema = new Schema(
  {

        // category: "",
        // productType: "",
        // productName: "",
        // brand: "",
        // description: "",
        // condition: "",
        // warrenty: "",
        // quantity: "",
        // minimumOrder: "",
        // discount: "",
        // price: "",
        // priceType: "",
        // dateOflist: "",
        // location: "",
        // photos: null,
        // bills: null,
        // servicetype: "",
        // serviceArea: "",
        // experiance: "",
        // charges: "",
        // availability: "",
        // details: "",
        // duration: "",
        // deposit: "",
        // terms: "",
        // industry: "",
        // skills: "",
        // payRange: "",
        // deadLine: "",
        // breed: "",
        // ageofPet: "",
        // vaccination: "",
        // adoptionFee: "",
        // model: "",
        // yearofMfg: "",
        // mileage: "",
        // regStatus: "",
        // fuel: "",
        // propertyType: "",
        // bhkCount: "",
        // area: "",
        // furnishing: "",

    productName: {
      type: String,
      required: [false, "Product name is required"],
    },
    description: { type: String, required: [false, "Description is required"] },
    category: { type: String, required: [false, "Category is required"] },
    brand: { type: String, required: [false, "Brand is required"] },
    model: { type: String, required: [false, "Model is required"] },
    condition: { type: String, required: [false, "Condition is required"] },
    dateOflist: { type: String },
    servicetype: { type: String },
    experiance: { type: String },
    charges: { type: String },
    details: { type: String },
    duration: { type: String },
    deposit: { type: String },
    industry: { type: String },
    terms: { type: String },
    skills: { type: String },
    payRange: { type: String },
    warrenty: { type: String },
    warrantyInfo: {
      type: String,
      required: [false, "Warranty information is required"],
    },
    price: { type: Number, required: [false, "Price is required"] },
    priceType: { type: String, required: [false, "Price type is required"] },
    discount: { type: Number, default: 0 }, // Optional field
    quantity: { type: Number, required: [false, "Quantity is required"] },
    minimumOrder: {
      type: Number,
      required: [false, "Minimum order is required"],
    },
    isSold: {
      type: Boolean,
      required: [false, "Sold status is required"],
      default: false,
    },
    isDeleted: { type: Boolean, default: false },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deletedAt: {
      type: Date,
      default: Date.now,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

marketSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const MarketPlace = model("MarketPlace", marketSchema);
export default MarketPlace;
