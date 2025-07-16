import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ifmRoleSchema = new Schema(
  {
    role: {
      type: String,
      required: [true, "Role is required"],
      minlength: [3, "Role must be at least 3 characters"],
      maxlength: [50, "Role cannot exceed 50 characters"],
      trim: true,
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

ifmRoleSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const IfmStaffRoles = model("IfmStaffRoles", ifmRoleSchema);
export default IfmStaffRoles;
