import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  instructor: { type: String, required: true },
  duration: { type: Number, required: true },
  courseImage: { type: Buffer },
  topics: { type: String, required: true },
  prerequisites: { type: String, required: true },
  publishingOptions: { type: String, required: true },
  keywords: { type: String, required: true },
});

export default mongoose.model("Course", courseSchema);
