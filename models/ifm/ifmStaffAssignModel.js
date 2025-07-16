import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ifmStaffAssignSchema = new Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Staff is required"],
    },
    blockId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Block",
      required: [true, "Block is required"],
    },
    flatId:{
       type: mongoose.Schema.Types.ObjectId,
      ref: "Flat",
      required: [false, "Flat is required"],
    },
    floorName:{
      type: String,
      required: [true, "Floor Name is required"],
    },
    startDate: {
      type: String,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: String,
      required: [true, "End date is required"],
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
    },
    endTime: {
      type: String,
      required: [true, "End time is required"],
    },
    shiftType: {
      type: String,
      required: [true, "Shift type is required"],
    },
  },
  {
    timestamps: true,
  }
);


ifmStaffAssignSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const IfmStaffAssign = model("IfmStaffAssign", ifmStaffAssignSchema);
export default IfmStaffAssign;
