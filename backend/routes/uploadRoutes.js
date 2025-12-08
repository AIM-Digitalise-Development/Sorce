import express from "express";
import { upload } from "../config/multer.js"; // Import the multer configuration

const router = express.Router();

// File upload route
router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.json({
      message: "File uploaded successfully",
      imageUrl: req.file.path, // Cloudinary URL
    });
  } catch (error) {
    res.status(500).json({ message: "File upload failed", error: error.message });
  }
});

export default router;
