import Course from "../models/course.js";
import multer from "multer";
import { extname } from "path";

// Set up multer storage configuration (using memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

const courseController = {
  createCourse: [
    upload.single("courseImage"), // Ensures a single file upload for courseImage
    async (req, res) => {
      try {
        console.log("Received form data:", req.body); // Log all received form data
        // File is directly available as req.file when using upload.single()
        const file = req.file;

        // Log file information if uploaded
        if (file) {
          console.log("Received file with name:", file.originalname);
        } else {
          console.log("No file uploaded with the courseImage field");
        }

        // Check if file is included in the request
        if (!file) {
          throw new Error("courseImage is required");
        }

        // Validate file type (allowed extensions: .jpg, .jpeg, .png)
        const allowedExtensions = [".jpg", ".jpeg", ".png"];
        const fileExtension = extname(file.originalname).toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
          throw new Error("Invalid file type. Only JPEG and PNG are allowed");
        }

        const fileData = file.buffer; // Store file data as buffer

        // Extract and convert data from the request body
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

        // Convert and log price and duration to ensure they're correctly processed
        console.log(
          `Converting price: ${price} and duration: ${duration} to numbers.`
        );

        // Create a new course document
        const newCourse = new Course({
          courseCode,
          title,
          description,
          category,
          price: Number(price), // Convert price to Number
          instructor,
          duration: Number(duration), // Convert duration to Number
          courseImage: fileData, // Already a buffer
          topics,
          prerequisites,
          publishingOptions,
          keywords,
        });

        // Save the course document to the database
        await newCourse.save();
        console.log("New course created successfully");

        // Respond with success message
        res.status(201).json({ message: "Course created successfully" });
      } catch (error) {
        console.error("Error creating course:", error);
        res
          .status(500)
          .json({ message: error.message || "Internal server error" });
      }
    },
  ],

  // Controller method to retrieve all courses
  getAllCourses: async (req, res) => {
    try {
      const coursesCursor = Course.find().cursor();

      // Placeholder for processed courses, if you wish to send them back
      let courses = [];

      for (
        let course = await coursesCursor.next();
        course != null;
        course = await coursesCursor.next()
      ) {
        // Convert the image to Base64 if it exists
        if (course.courseImage && course.courseImage instanceof Buffer) {
          // Convert Buffer to Base64
          const imageBase64 = course.courseImage.toString("base64");

          course = course.toObject();
          course.courseImageBase64 = `data:image/jpeg;base64,${imageBase64}`; // Assuming image is JPEG
        }

        console.log(course);
        courses.push(course);
      }

      // Send all processed courses in response, if desired
      res.status(200).json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default courseController;
