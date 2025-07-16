import mongoose from "mongoose";
const { Schema, model } = mongoose;

const unitRegistrationSchema = new Schema({
    constructionAgreement: { type: String, required: [true, "Construction agreement is required"] },
    saleDeed: { type: String, required: [true, "Sale Deed is required"] },
    parkingAllotment: { type: String, required: [false, "Parking allotment is required"] },
    createdAt: {
        type: Date,
    },
    createdBy: {
        type: Date,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

unitRegistrationSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const UnitRegistration = model("unitRegistration", unitRegistrationSchema);
export default UnitRegistration;
