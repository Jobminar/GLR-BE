import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    jobLocation: { type: String, required: true },
    jobType: { type: String, required: true },
    jobCategory: { type: String, required: true },
    jobDescription: { type: String, required: true },
    skills: { type: [String], required: true }, // Assuming skills are an array of strings
    experience: { type: String, required: true },
    education: { type: String, required: true },
    salary: { type: Number, required: true },
    applicationDeadline: { type: Date, required: true },
    applicationUrl: { type: String, required: true },
    contactPerson: { type: String, required: true },
    contactMobile: { type: String, required: true },
    careerImage: { type: Buffer }, // Optional, assuming it's a file upload
  },
  { timestamps: true }
);

export const Career = mongoose.model("Career", careerSchema);
