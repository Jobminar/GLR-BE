import multer from "multer";
import path from "path";
import fs from "fs";

// Define a function to sanitize filenames
const sanitizeFilename = (filename) => {
  return filename.replace(/[^a-z0-9]/gi, "_");
};

// Function to ensure the uploads directory exists
const ensureUploadsDirectory = () => {
  const currentDir = path.resolve(path.dirname(""));
  const uploadsPath = path.join(currentDir, "uploads");

  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath);
  }
};

// Ensure the uploads directory exists
ensureUploadsDirectory();

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const sanitizedFilename = sanitizeFilename(file.originalname);
    cb(null, `${Date.now()}-${sanitizedFilename}`);
  },
});

// Initialize Multer middleware
const upload = multer({ storage });

export default upload;
