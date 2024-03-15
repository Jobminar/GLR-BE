import { Schema, model } from "mongoose";

const otpSchema = new Schema({
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
  otpExpireAt: {
    type: Date,
    default: Date.now,
    index: { expires: "5m" }, // this OTP is valid only for 5 minutes
  },
});

export default model("OTP", otpSchema);
