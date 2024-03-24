import multer from "multer";
import { extname } from "path";
import { Career } from "../models/career.js";
// File filter for multer to restrict file types
const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpeg", ".jpg", ".png", ".pdf"];
  const extension = extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(extension)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, JPG, PNG, and PDF files are allowed."
      ),
      false
    );
  }
};

// Set up Multer for memory storage with file filter
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Optional: Limit file size to 10MB
}).single("careerImage");

// Create a new career posting
const careerController = {
  createCareer: (req, res) => {
    upload(req, res, async (error) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }

      const file = req.file;
      if (file) {
        console.log("Received file with name:", file.originalname);
        // Validate file type
        const allowedExtensions = [".jpg", ".jpeg", ".png", ".pdf"];
        if (
          !allowedExtensions.includes(extname(file.originalname).toLowerCase())
        ) {
          return res.status(400).json({
            message:
              "Invalid file type. Only JPEG, PNG, and PDF files are allowed.",
          });
        }
      } else {
        console.log("No file uploaded with the careerImage field.");
      }

      // Proceed with your existing logic for handling career creation
      const careerData = {
        ...req.body,
        careerImage: file ? file.buffer : undefined,
      };
      try {
        const newCareer = new Career(careerData);
        await newCareer.save();
        res
          .status(201)
          .json({ message: "Career created successfully", data: newCareer });
      } catch (dbError) {
        console.error("Error creating career:", dbError);
        res
          .status(500)
          .json({ message: dbError.message || "Internal server error" });
      }
    });
  },

  // This method does not follow conventional practices and is for illustrative purposes
  getAllCareers: async (req, res) => {
    try {
      const cursor = Career.find().cursor();
      for (
        let doc = await cursor.next();
        doc != null;
        doc = await cursor.next()
      ) {
        // Streaming or sending documents one by one - this is a simplistic approach
        // Note: This won't work as expected with HTTP since HTTP responses are typically sent all at once
        res.write(JSON.stringify(doc) + "\n");
      }
      res.end();
    } catch (error) {
      console.error("Error fetching careers:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

// Additional controller methods can be added here

export default careerController;
