import mongoose from "mongoose";
const { Schema, model } = mongoose;

const youtubeRegex =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

const websiteSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    webVideo: {
      type: String,
      required: [false, "Url is required"],
      validate: {
        validator: function (value) {
          return youtubeRegex.test(value);
        },
        message: (props) => `Invalid YouTube video URL`,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

websiteSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const WebsiteFiles = model("websiteFiles", websiteSchema);

export default WebsiteFiles;
