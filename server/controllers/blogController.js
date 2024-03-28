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

      const file = req.file;

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
      const blogs = await Blog.find({});
      const blogsTransformed = blogs.map((blog) => {
        const blogObj = blog.toObject();
        if (blogObj.image && Buffer.isBuffer(blogObj.image)) {
          blogObj.image = `data:image/jpeg;base64,${blogObj.image.toString(
            "base64"
          )}`;
        }
        return blogObj;
      });
      res.status(200).json(blogsTransformed);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteBlog: async (req, res) => {
    const { id } = req.params; // Get the blog ID from the request parameters

    try {
      const result = await Blog.findByIdAndDelete(id);
      if (result) {
        res.status(200).json({ message: "Blog deleted successfully" });
      } else {
        res.status(404).json({ message: "Blog not found" });
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default blogController;
