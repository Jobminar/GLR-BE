import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publicationDate: { type: Date, required: true },
    category: { type: String, required: true },
    keywords: { type: String },
    image: { type: Buffer }, // Assuming image will be stored as a binary data
    description: { type: String, required: true },
    publishOptions: { type: String, required: true },
    visibility: { type: String, required: true },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
