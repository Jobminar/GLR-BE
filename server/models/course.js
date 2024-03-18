import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true,
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
  students: [String],
  duration: {
    type: Number,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  topics: [String],
  prerequisites: [String],
});

export default model("Course", courseSchema);
