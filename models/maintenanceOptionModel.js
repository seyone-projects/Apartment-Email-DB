import mongoose from "mongoose";
const { Schema, model } = mongoose;

const maintenanceOptionSchema = new Schema(
  {
    type: {
      type: String,
      trim: true,
      required: [false, "Maintenance type is Required"],
    },
    fixedRpft: {
      type: String,
    },
    dueType: {
      type: String,
      enum: ["rupee", "percentage"],
      default: null,
    },
    dueAmount: {
      type: Number,
      default: null,
      validate: {
        validator: function (val) {
          if (this.dueType === "percentage") return val <= 100;
          if (this.dueType === "rupee") return val <= 10000;
          return true;
        },
        message: (props) => `Invalid dueAmount: ${props.value}`,
      },
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
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

maintenanceOptionSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const MaintenanceOption = model("maintenanceOption", maintenanceOptionSchema);

export default MaintenanceOption;
