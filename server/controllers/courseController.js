import Course from "../models/course.js";
import multer from "multer";
import { extname } from "path";

// Set up multer storage configuration (using memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

const courseController = {
  createCourse: [
    upload.any(), // Multer middleware to handle any file upload
    async (req, res) => {
      try {
        // Find the file uploaded from the 'courseImage' field
        const file = req.files.find((file) => file.fieldname === "courseImage");

        // Check if file is included in the request
        if (!file) {
          return res.status(400).json({ message: "courseImage is required" });
        }

        // Validate file type (allowed extensions: .jpg, .jpeg, .png)
        const allowedExtensions = [".jpg", ".jpeg", ".png"];
        const fileExtension = extname(file.originalname).toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
          return res
            .status(400)
            .json({ message: "Invalid file type. Only JPEG, PNG allowed" });
        }

        const fileData = file.buffer; // Store file data as buffer

        // Extract data from the request body
        const {
          courseCode,
          title,
          description,
          category,
          price,
          instructor,
          duration,
          topics,
          publishingOptions,
          prerequisites,
          keywords,
        } = req.body;

        // Create a new course document
        const newCourse = new Course({
          courseCode,
          title,
          description,
          category,
          price,
          instructor,
          duration,
          courseImage: fileData, // Store file data in courseImage field as buffer
          topics,
          prerequisites,
          publishingOptions,
          keywords,
        });

        // Save the course document to the database
        await newCourse.save();

        // Respond with success message
        res.status(201).json({ message: "Course created successfully" });
      } catch (error) {
        // Handle errors
        console.error("Error creating course:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    },
  ],

  // Controller method to retrieve all courses
  getAllCourses: async (req, res) => {
    try {
      // Retrieve all courses from the database
      const courses = await Course.find();

      // Send the courses as a response
      res.status(200).json(courses);
    } catch (error) {
      // Handle errors
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Controller method to retrieve a single course by ID
  getCourse: async (req, res) => {
    try {
      // Retrieve course by ID from the request parameters
      const courseId = req.params.id;
      const course = await Course.findById(courseId);

      // If course is not found
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      // Assuming courseImage is a buffer, send the file content
      if (course.courseImage && course.courseImage instanceof Buffer) {
        res.setHeader(
          "Content-Type",
          "image/" + extname(course.courseImage).slice(1)
        ); // Set appropriate content type based on extension
        res.send(course.courseImage); // Send the file content
      } else {
        // Handle case where no image is associated with the course or it's not a buffer
        res.status(200).json({ message: "Course retrieved without image" });
      }
    } catch (error) {
      // Handle errors
      console.error("Error fetching course:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default courseController;
