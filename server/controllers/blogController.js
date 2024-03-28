import { Blog } from "../models/blog.js";
import multer from "multer";

// Setup multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

const blogController = {
  createBlog: (req, res) => {
    upload(req, res, async (error) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }

      // Extract the file from the request, if present
      const file = req.file;

      // Prepare the blog data, including the image buffer if an image was uploaded
      const blogData = {
        ...req.body,
        publicationDate: new Date(req.body.publicationDate),
        image: file ? file.buffer : undefined, // Store the buffer directly
      };

      try {
        const newBlog = new Blog(blogData);
        await newBlog.save();
        res
          .status(201)
          .json({ message: "Blog created successfully", data: newBlog });
      } catch (dbError) {
        console.error("Error creating blog:", dbError);
        res
          .status(500)
          .json({ message: dbError.message || "Internal server error" });
      }
    });
  },

  getAllBlogs: async (req, res) => {
    try {
      const cursor = Blog.find().cursor();
      let blogs = [];

      for (
        let doc = await cursor.next();
        doc != null;
        doc = await cursor.next()
      ) {
        const blog = doc.toObject(); // Convert Mongoose document to plain JavaScript object

        // Convert the image buffer to Base64 if present
        if (blog.image && blog.image instanceof Buffer) {
          // Adjust the MIME type accordingly. You might want to store this in the DB or infer it.
          blog.image = `data:image/jpeg;base64,${blog.image.toString(
            "base64"
          )}`;
        }

        blogs.push(blog);
      }

      res.status(200).json(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default blogController;
