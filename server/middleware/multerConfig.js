import multer from "multer";
import path from "path";

// Define a function to sanitize filenames
const sanitizeFilename = (filename) => {
  return filename.replace(/[^a-z0-9]/gi, "_");
};

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the destination folder dynamically using path.join()
    const uploadDestination = path.join(__dirname, "../uploads/");
    cb(null, uploadDestination);
  },
  filename: (req, file, cb) => {
    const sanitizedFilename = sanitizeFilename(file.originalname);
    cb(null, `${Date.now()}-${sanitizedFilename}`);
  },
});

// Initialize Multer middleware
const upload = multer({ storage });

export default upload;
