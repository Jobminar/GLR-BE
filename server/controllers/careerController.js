import Career from '../models/careerModel.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const careerController = {
  createCareer: [
    upload.single('image'),
    async (req, res) => {
      try {
        const {
          jobTitle,
          companyName,
          jobLocation,
          jobType,
          jobCategory,
          jobDescription,
          skills,
          experience,
          education,
          salary,
          applicationDeadline,
          applicationUrl,
          contactPerson,
          contactMobile,
          additionalField
        } = req.body;

        const newCareer = new Career({
          jobTitle,
          companyName,
          jobLocation,
          jobType,
          jobCategory,
          jobDescription,
          skills,
          experience,
          education,
          salary,
          applicationDeadline,
          applicationUrl,
          contactPerson,
          contactMobile,
          image: req.file.buffer.toString('base64'), // Assuming the image is uploaded as a file and stored in req.file.buffer
          additionalField
        });

        await newCareer.save();

        res.status(201).json({ message: 'Career created successfully', career: newCareer });
      } catch (error) {
        res.status(500).json({ message: 'Error creating career', error: error.message });
      }
    }
  ]
};

export default careerController;
