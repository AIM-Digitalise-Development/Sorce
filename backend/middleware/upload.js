import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Storage settings for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "sorce", // Cloudinary folder where files will be stored
    allowed_formats: ["jpg", "png", "jpeg", "mp4"],
    resource_type: "auto", // Auto-detect image or video
  },
});

export const upload = multer({ storage });
