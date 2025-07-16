import mongoose from "mongoose";
const { Schema, model } = mongoose;

const amenitySchema = new Schema(
  {
    amenityTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AmenityType",
      required: false,
    },
    block: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Block",
      required: false,
    },
    amenity: { type: String, required: [false, "Amenity is required"] },
    amenityName: {
      type: String,
      required: [false, "Amenity name is required"],
    },
     flatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flat",
      required: false,
    },
    floorName:{
      type: String,
    },
    gender: { type: String, required: [true, "Gender is required"] },
    timeSlot: { type: String, required: [false, "Time slot is required"] },
    status: { type: Boolean, required: [true, "Status is required"] },
    startTime: { type: String, required: [true, "Start time is required"] },
    endTime: { type: String, required: [true, "End time is required"] },
    photo: {
      type: String,
      validate: {
        validator: function (v) {
          if (!v) return true;
          return /^https?:\/\/.*\.(jpeg|jpg|gif|png|webp)$/i.test(v);
        },
        message: "Must be a valid image URL (jpg, png, webp, gif)",
      },
      required: false,
    },

    maintanence: { type: String, required: [false, "Maintenance is required"] },
    start: { type: String, required: [false, "Start time is required"] },
    end: { type: String, required: [false, "End time is required"] },
    startDate: { type: Date, required: [false, "Start date is required"] },
    endDate: { type: Date, required: [false, "End date is required"] },
    mainDetail: { type: String, required: [false, "Main detail is required"] },
    partyHall: { type: String, required: [false, "Party hall is required"] },
    fullDay: {
      type: Number,
      validate: {
        validator: function (v) {
          return !isNaN(v);
        },
        message: (props) => `${props.value} is not a valid number!`,
      },
    },
    halfDay: {
      type: Number,
      validate: {
        validator: function (v) {
          return !isNaN(v);
        },
        message: (props) => `${props.value} is not a valid number!`,
      },
    },
    hourlyBased: {
      type: Number,
      validate: {
        validator: function (v) {
          return !isNaN(v);
        },
        message: (props) => `${props.value} is not a valid number!`,
      },
    },
    blockDesc: { type: String, required: [true, "Description is required"] },
    chargesApplicable: {
      type: Boolean,
      required: [true, "Charges applicable is required"],
    },
    preBooking: { type: Boolean, required: [true, "Pre booking is required"] },
    amount: { type: String, required: [false, "Amount is required"] },
    maximumCapacity: {
      type: String,
      required: [false, "Capacity is required"],
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

amenitySchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Amenity = model("Amenity", amenitySchema);
export default Amenity;
