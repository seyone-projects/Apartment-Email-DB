import mongoose from "mongoose";
const { Schema, model } = mongoose;

const pageSchema = new Schema(
  {
    pageName: { type: String },
    api: { type: String },
  },
  { timestamps: true }
);

pageSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const PageSchema = model("ApiPage", pageSchema);
export default PageSchema;
