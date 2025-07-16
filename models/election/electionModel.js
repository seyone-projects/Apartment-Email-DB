import mongoose from "mongoose";
const { Schema, model } = mongoose;

const electionSchema = new Schema(
  {
    electionDate: {
      type: Date,
      required: [true, "Election date is required"],
      validate: {
        validator: function (value) {
          return value > new Date();
        },
        message: "Election date must be in the future",
      },
    },
    nominationStartDate: {
      type: Date,
      required: [true, "Nomination start date is required"],
    },
    nominationEndDate: {
      type: Date,
      required: [true, "Nomination end date is required"],
      validate: {
        validator: function (value) {
          return this.nominationStartDate && value > this.nominationStartDate;
        },
        message: "Nomination end date must be after nomination start date",
      },
    },
    campaignStartDate: {
      type: Date,
      required: [true, "Campaign start date is required"],
    },
    campaignEndDate: {
      type: Date,
      required: [true, "Campaign end date is required"],
      validate: {
        validator: function (value) {
          return this.campaignStartDate && value > this.campaignStartDate;
        },
        message: "Campaign end date must be after Campaign start date",
      },
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },
    deletedAt: {
      type: Date,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

electionSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const election = model("Election", electionSchema);

export default election;
