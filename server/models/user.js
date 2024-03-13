import { Schema, model } from "mongoose";

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true, // Ensure unique mobile number for login
    validate: {
      validator: (mobile) => /\d{10}$/.test(mobile), // Validate 10-digit phone number format
      message: "Mobile number must be a valid 10-digit number.",
    },
  },
  email: {
    type: String,
    trim: true,
    lowercase: true, // Convert email to lowercase for case-insensitive comparison
    unique: true, // Ensure unique email for registration
    validate: {
      validator: (email) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
      message: "Please enter a valid email address.",
    },
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"], // Allow flexibility in gender identification
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
    validate: {
      validator: (mobile) => (mobile ? /\d{10}$/.test(mobile) : true), // Optional validation for alternate number
      message: "Alternate number must be a valid 10-digit number.",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Enforce minimum password length for security
  },
});

export default model("User", userSchema);
