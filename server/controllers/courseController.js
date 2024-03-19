import Course from "../models/course.js";
import { PDFDocument } from "pdf-lib";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Adjust upload directory
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
      if (!req.files || !req.files.pdfFile) {
        console.error("PDF file is missing from the request.");
        return res
          .status(400)
          .json({ message: "PDF file is missing from the request." });
      }

      const pdfBuffer = req.files.pdfFile.data; // Access the PDF data buffer

      // Attempt to load the PDF buffer using pdf-lib
      const pdfDoc = await PDFDocument.load(pdfBuffer);
      console.log("PDF parsed successfully.");

      // **Process the PDF content
      const textContent = await pdfDoc.getTextContent();
      console.log("Extracted text:", textContent);

      // **Optionally extract other information (e.g., images, metadata):**
      const pages = pdfDoc.getPages();
      const images = []; // Array to store extracted images

      for (const page of pages) {
        const pageImages = await page.extractImages(); // Extract images from each page
        images.push(...pageImages); // Add extracted images to the array
      }

      console.log("Extracted images:", images); // Log extracted images (adjust based on usage)

      const newCourse = await Course.save();
      console.log("New course saved:", newCourse);

      // **Optionally store extracted data in the course object:**
      newCourse.extractedText = textContent;
      newCourse.extractedImages = images; // Assuming images are processed appropriately
      await newCourse.save(); // Save the updated course with extracted data

      res.status(201).json(newCourse);
    } catch (err) {
      // Catch and log pdf-lib specific errors
      if (err instanceof PDFDocument.LoadError) {
        console.error("Error loading PDF:", err.message);
      } else {
        console.error("Error during course creation:", err.message);
      }
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
