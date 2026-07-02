import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "password should be atleast 8 digits"],
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      required: true,
      default: "customer",
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
