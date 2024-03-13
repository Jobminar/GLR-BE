import { createTransport } from "nodemailer";
import User from "../models/user.js"; // Replace with your user model path

// Function to generate a random 4-digit OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000); // Ensures 4-digit number
};

// Function to send the OTP via email
const sendOTP = async (mobileNumber, email) => {
  const otp = generateOTP();

  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "jobminarinfo@gmail.com", // Replace with a secure environment variable
      pass: process.env.EMAIL_PASSWORD, // Replace with a secure environment variable for password
    },
  });

  const mailOptions = {
    from: "jobminarinfo@gmail.com", // Replace with your email address
    to: email,
    subject: `Login OTP for Your Account with mobile number ${mobileNumber}`,
    text: `Your login OTP is ${otp}. Please enter this code to verify your identity. This code will expire in 1 minute.Thank you for choosing GLR`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("OTP sent:", info.response);
    return otp;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error; // Re-throw for proper error handling
  }
};

// Login controller with OTP verification and expiration
export async function login(req, res) {
  const { mobileNumber } = req.body;

  try {
    const user = await findOne({ mobileNumber });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with the provided mobile number." });
    }

    const otp = await sendOTP(mobileNumber, user.email);

    // Create a new OTP document in MongoDB with expiration
    const newOTP = new User({
      mobileNumber,
      otp,
      otpExpireAt: Date.now() + 60000,
    }); // Expires in 1 minute
    await newOTP.save();

    res.status(200).json({
      message:
        "OTP sent successfully. Please check your email for the verification code.",
      otp, // Include the generated OTP for verification on the frontend (optional)
    });
  } catch (error) {
    console.error("Error during login process:", error);
    res.status(500).json({ message: "An error occurred during login." });
  }
}

// Verification controller (optional)
export async function verifyOTP(req, res) {
  const { mobileNumber, otp } = req.body;

  try {
    const user = await findOne({ mobileNumber });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with the provided mobile number." });
    }

    const currentOTP = await findOne({ mobileNumber, otp });
    if (!currentOTP || currentOTP.otpExpireAt < Date.now()) {
      // Check for existence and expiration
      return res.status(401).json({ message: "Invalid or expired OTP." });
    }

    // OTP verification successful (handle login logic here)
    res.status(200).json({ message: "OTP verified successfully." });

    // Remove the OTP document from the database after verification
    await deleteOne({ mobileNumber, otp });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).json({ message: "An error occurred during verification." });
  }
}

export async function signUp(req, res) {
  const {
    fullName,
    mobileNumber,
    email,
    gender,
    dateOfBirth,
    location,
    alternateNumber,
    password,
  } = req.body;

  try {
    // Basic user data validation (optional)
    if (!fullName || !mobileNumber || !email || !dateOfBirth || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    // Check if user with the provided mobile number or email already exists
    const existingUser = await User.findOne({
      $or: [{ mobileNumber }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this mobile number or email already exists.",
      });
    }

    // Optional: Generate OTP (use `sendOTP` function if OTP verification is enabled)
    let otp;
    if (sendOTP) {
      otp = await sendOTP(mobileNumber, email);
    }

    // Create a new user
    const newUser = new User({
      fullName,
      mobileNumber,
      email,
      gender,
      dateOfBirth,
      location,
      alternateNumber,
      password,
    });

    // Hash the password before saving
    newUser.password = await bcrypt.hash(newUser.password, 10);

    await newUser.save();

    // Send OTP verification email or handle successful signup based on requirements
    if (otp) {
      res.status(201).json({
        message:
          "Signup successful. Please check your email for the verification code.",
      });
    } else {
      res.status(201).json({ message: "User created successfully." }); // Or redirect to login if OTP verification is not used
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "An error occurred during signup." });
  }
}
