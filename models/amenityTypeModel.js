import mongoose from "mongoose";
const { Schema, model } = mongoose;

const amenityTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Amenity type name is required"],
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
      trim: true,
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
  { timestamps: true }
);

amenityTypeSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const AmenityType = model("AmenityType", amenityTypeSchema);
export default AmenityType;
