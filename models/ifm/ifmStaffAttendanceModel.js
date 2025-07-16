import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ifmStaffAttendanceSchema = new Schema(
  {
    status: {
      type: String,
      required: [true, "Attendance Status is required"],
    },
    date: {
      type: Date,
      required: [true, "Attendance Status is required"],
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

ifmStaffAttendanceSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const IfmStaffAttendance = model(
  "IfmStaffAttendance",
  ifmStaffAttendanceSchema
);
export default IfmStaffAttendance;
