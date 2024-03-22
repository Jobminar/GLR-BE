import { model, Schema } from "mongoose";
const careerSchema = new Schema({
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  jobLocation: { type: String, required: true },
  jobType: { type: String, required: true },
  jobCategory: { type: String, default: Date },
  jobDescription: { type: String, required: true },
  skills: { type: String, required: true },
  experience: { type: String, required: true },
  education: { type: String, required: true },
  salary: { type: String, required: true },
  applicationDeadline: { type: String, required: true },
  applicationUrl: { type: String, required: true },
  contactPerson: { type: String, required: true },
  contactMobile: { type: String, required: true },
  careerImage: { type: String, required: true },
  additionalField: { type: String, required: true },
});
const Career = model("Career", careerSchema);
export default Career;
