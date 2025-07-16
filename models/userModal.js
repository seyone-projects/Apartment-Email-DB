import mongoose from "mongoose";
const { Schema, model } = mongoose;

const enums = ["requested", "pending", "approved", "rejected"];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is Required"],
      unique: true,
    },
    residentType: {
      type: String,
      required: [false, "Resident Type is Required"],
    },
    blockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Block",
    },
    flatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flat",
    },
    email: {
      type: String,
      required: [false, "Email is Required"],
    },
    password: {
      type: String,
    },
    address: {
      type: String,
    },
    addressProof: {
      type: String,
    },
    photo: {
      type: String,
    },
    age: {
      type: Number,
    },
    otp: {
      type: Number,
    },
    role: {
      type: String,
    },
    asRole: {
      type: String,
    },
    documents: {
      construction: {
        url: { type: String },
        status: {
          type: String,
          enum: enums,
          default: "requested",
        },
        isViewed: {
          type: Boolean,
          default: false,
        },
      },
      saleDeed: {
        url: { type: String },
        status: {
          type: String,
          enum: enums,
          default: "requested",
        },
        isViewed: {
          type: Boolean,
          default: false,
        },
      },
      parkingLetter: {
        url: { type: String },
        status: {
          type: String,
          enum: enums,
          default: "requested",
        },
        isViewed: {
          type: Boolean,
          default: false,
        },
      },
      aadharFront: {
        url: { type: String },
        status: {
          type: String,
          enum: enums,
          default: "requested",
        },
        isViewed: {
          type: Boolean,
          default: false,
        },
      },
      aadharBack: {
        url: { type: String },
        status: {
          type: String,
          enum: enums,
          default: "requested",
        },
        isViewed: {
          type: Boolean,
          default: false,
        },
      },
    },

    isActive: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdminUpload: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isAdminVerified: {
      type: Boolean,
      default: false,
    },
    otpExpiryTime: {
      type: Number,
    },
    autoDeleteTime: {
      type: Number,
    },
    sessionToken: {
      type: String,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      default: null,
    },
    rentalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rental",
      default: null,
    },
    flatOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    logoutAt: {
      type: Date,
    },
    loginAs: {
      type: String,
    },
    isExistedUser: {
      // Existed owner if true
      type: Boolean,
      default: null,
    },
    isAdmin: {
      // user can be either owner or admin
      type: Boolean,
      default: false,
    },
    builderHandoverDate: {
      type: String,
    },
    builderLogoUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const user = model("User", userSchema);

export default user;
