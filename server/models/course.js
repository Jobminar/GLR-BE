import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  CourseCode: {
    type: String,
    required: true,
    unique: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Description: {
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
  Duration: {
    type: Number,
    required: true,
  },
  File: {
    type: String,
    required: true,
  },
  topics: [String],
  prerequisites: [String],
});

export default model("Course", courseSchema);
