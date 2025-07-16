import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ifmStaffTimesheetSchema = new Schema(
  {
    staffId:{      
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fromDate: {
        type: Date,
    },
    toDate:{
        type: Date,
    },
    isTimeSheetEnable:{
        type: Boolean,
    },
    isTimeSheetStatus:{
      type: String,
    },
    rejectReason:{
      type: String,
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

ifmStaffTimesheetSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const IfmStaffTimeSheet = model("IfmStaffTimeSheet", ifmStaffTimesheetSchema);
export default IfmStaffTimeSheet;
