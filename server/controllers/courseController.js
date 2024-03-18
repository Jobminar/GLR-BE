import multer from "multer";
import { pdfParser } from "pdf-lib";
import Course from "../models/course.js";

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Adjust upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

const courseController = {
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
      const { title, description } = req.body;

      // Handle PDF upload using multer
      upload.single("pdf")(req, res, async (err) => {
        if (err) {
          console.error("Error uploading PDF:", err);
          return res.status(500).json({ message: "Error uploading PDF" });
        }

        const uploadedFile = req.file;

        // Process the uploaded PDF file (e.g., extract text, metadata, etc.)
        const pdfBytes = await pdfParser(uploadedFile.path);
        const pdfText = pdfBytes.getText();

        // Create a new course with PDF data and other fields
        const course = new Course({
          title,
          description,
          pdfText,
          description,
          price,
          instructor,

          duration,
          file,
          topics,
          prerequisites,
        });

        // Save the new course to the database
        const newCourse = await course.save();

        res.status(201).json(newCourse);
      });
    } catch (err) {
      console.error("Error creating course:", err);
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

  updateCourse: async (req, res) => {
    const id = req.params.id;
    try {
      const course = await Course.findById(id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      course.set(req.body);
      const updatedCourse = await course.save();
      res.json(updatedCourse);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteCourse: async (req, res) => {
    const id = req.params.id;
    try {
      const course = await Course.findById(id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      await course.remove();
      res.json({ message: "Course deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default courseController;
