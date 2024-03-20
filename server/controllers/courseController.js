// backend/controllers/courseController.js
import Course from '../models/course.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const courseController = {
    createCourse: [
        upload.single('file'), // Invoking multer middleware to handle file upload
        async (req, res) => {
            try {
                // Check if file is included in the request
                if (!req.file) {
                    return res.status(400).json({ message: 'File is required' });
                }

                // Extract data from the request body
                const { courseCode, title, description, price, instructor, duration, topics, prerequisites } = req.body;

                // Create a new course document
                const newCourse = new Course({
                    courseCode,
                    title,
                    description,
                    price,
                    instructor,
                    duration,
                    file: req.file.buffer, // Assuming req.file.buffer contains the file data
                    topics,
                    prerequisites
                });

                // Save the course document to the database
                await newCourse.save();

                // Respond with success message
                res.status(201).json({ message: 'Course created successfully' });
            } catch (error) {
                // Handle errors
                console.error("Error creating course:", error);
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    ],
    getAllCourses: async (req, res) => {
        try {
            // Retrieve all courses from the database
            const courses = await Course.find();

            // Send the courses as a response
            res.status(200).json(courses);
        } catch (error) {
            // Handle errors
            console.error("Error fetching courses:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getCourse: async (req, res) => {
        try {
            // Retrieve course by ID from the request parameters
            const courseId = req.params.id;
            const course = await Course.findById(courseId);

            // If course is not found
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }

            // Send the file as a response
            res.setHeader('Content-Type', 'application/pdf');
            res.send(course.file); // Assuming course.file contains the Buffer data of the file
        } catch (error) {
            // Handle errors
            console.error("Error fetching course:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export default courseController;
