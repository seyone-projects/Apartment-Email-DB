import mongoose from "mongoose";
const { Schema, model } = mongoose;

const apartmentBlockSchema = new Schema(
  {
    blockName: {
      type: String,
      required: [true, "Block Name is Required"],
    },
    noOfFloor: {
      type: Number,
      required: [true, "Number of floor is Required"],
      validate: {
        validator: function (value) {
          return !isNaN(value);
        },
        message: 'Number of floor must be a valid number.',
      },
    },
    noOfUnit: {
      type: Number,
      required: [true, "Number of unit is Required"],
      validate: {
        validator: function (value) {
          return !isNaN(value);
        },
        message: 'Number of unit must be a valid number.',
      },
    },
    noOfLift: {
      type: Number,
      required: [true, "Number of lift is Required"],
      validate: {
        validator: function (value) {
          return !isNaN(value);
        },
        message: 'Number of lift must be a valid number.',
      },
    },
    isActive: {
      type: Boolean,
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

apartmentBlockSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Block = model("Block", apartmentBlockSchema);

export default Block;
