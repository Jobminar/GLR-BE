import Course from "../models/course.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default {
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createCourse: async (req, res) => {
    try {
      // Validate the existence of the PDF file in the request
      if (!req.pdfFile) {
        console.error("PDF file is missing from the request.");
        return res
          .status(400)
          .json({ message: "PDF file is missing from the request." });
      }

      // Access the PDF file information
      const pdfFile = req.pdfFile;

      // Create a new Course instance with the file path
      const newCourse = new Course({
        file: pdfFile.path,
        // Include other fields if needed
      });

      // Save the new course to the database
      await newCourse.save();

      res.status(201).json(newCourse);
    } catch (err) {
      console.error("Error during course creation:", err.message);
      res.status(400).json({ message: err.message });
    }
  },

  getCourseById: async (req, res) => {
    const id = req.params.id;
    try {
      const course = await Course.findById(id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
