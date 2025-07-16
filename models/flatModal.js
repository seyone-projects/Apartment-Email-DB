import mongoose from "mongoose";
const { Schema, model } = mongoose;

const apartmentFlatSchema = new Schema(
  {
    blockId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Block Id is Required"],
      ref: "Block",
    },
    floorName: {
      type: String,
      required: [true, "Floor name is Required"],
    },
    flatNo: {
      type: Number,
      required: [true, "Flat Number is Required"],
      validate: {
        validator: function (value) {
          return !isNaN(value);
        },
        message: "Flat number must be a valid number.",
      },
    },
    squareFeet: {
      type: Number,
      required: [true, "Flat Square feet is required"],
      validate: {
        validator: function (value) {
          return !isNaN(value);
        },
        message: "Square feet must be a valid number.",
      },
    },
    noOfBhk: {
      type: Number,
      required: [true, "Number of BHK is required"],
      validate: {
        validator: function (value) {
          return !isNaN(value);
        },
        message: "Number of BHK must be a valid number.",
      },
    },
    type: {
      type: String,
      required: [true, "Type is Required"],
    },
    apartmentType: {
      type: String,
      required: [false, "Apartment Type is Required"],
    },
    rentalBooked: {
      type: Boolean,
      default: false,
    },
    maintenancePaidBy: {
      type: String,
      enum: ["Owner", "Rental"],
    },
    isActive: {
      type: Boolean,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

apartmentFlatSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Flat = model("Flat", apartmentFlatSchema);
export default Flat;
