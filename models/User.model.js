const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required."],
    },
    profileImage: {
      type: String,
      default: null
    },
    originalTrainingPlan: {
      type: Schema.Types.ObjectId,
      ref: 'OriginalTrainingPlan',
    },
    dynamicTrainingPlan: {
      type: Schema.Types.ObjectId,
      ref: 'DynamicTrainingPlan',
    },
  },
  {

    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
