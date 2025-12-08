import Client from "../models/Client.js";
import cloudinary from "../config/cloudinary.js";

// ✅ Upload Client Image to Cloudinary
export const uploadClientImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const fileUrl = req.file.path; // Cloudinary URL
    const clientImage = await Client.create({ fileUrl });

    res.status(201).json({ message: "Image uploaded successfully", clientImage });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Failed to upload image", error });
  }
};

// ✅ Get All Client Images
export const getAllClientImages = async (req, res) => {
  try {
    const clientImages = await Client.find().sort({ createdAt: -1 });
    res.status(200).json(clientImages);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ message: "Failed to fetch images", error });
  }
};

// ✅ Delete Client Image from Cloudinary
export const deleteClientImage = async (req, res) => {
  try {
    const { id } = req.params;
    const clientImage = await Client.findById(id);
    if (!clientImage) return res.status(404).json({ message: "Image not found" });

    // ✅ Extract Cloudinary public ID
    const publicId = clientImage.fileUrl.split("/").pop().split(".")[0];

    if (publicId) {
      await cloudinary.uploader.destroy(`banners/${publicId}`);
    }

    await clientImage.deleteOne();
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Failed to delete image", error });
  }
};
