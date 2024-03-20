import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  courseCode: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  pdfFile: {
    data: Buffer,
    contentType: String,
    fileName: String,
  },
  topics: [String],
  prerequisites: [String],
});

export default model("Course", courseSchema);
