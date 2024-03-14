import { Schema, model } from "mongoose";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true, // Ensure unique mobile number for login
  },
  email: {
    type: String,
    trim: true,
    lowercase: true, // Convert email to lowercase for case-insensitive comparison
    unique: true, // Ensure unique email for registration
  },
  gender: {
    type: String,

    default: "Male",
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    trim: true,
  },
  alternateNumber: {
    type: String,
  },
});

export default model("User", userSchema);
