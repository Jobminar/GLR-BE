import { Book } from "../models/book.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

const bookController = {
  createBook: (req, res) => {
    upload(req, res, async (error) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }

      const file = req.file;
      const bookData = {
        ...req.body,
        publicationDate: new Date(req.body.publicationDate),
        image: file ? file.buffer : undefined,
      };

      try {
        const newBook = new Book(bookData);
        await newBook.save();
        res
          .status(201)
          .json({ message: "Book created successfully", data: newBook });
      } catch (dbError) {
        console.error("Error creating book:", dbError);
        res
          .status(500)
          .json({ message: dbError.message || "Internal server error" });
      }
    });
  },

  getAllBooks: async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default bookController;
