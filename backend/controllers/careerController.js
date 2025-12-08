import Career from "../models/Career.js";
import cloudinary from "../config/cloudinary.js";

// ✅ Create Career Entry with File Upload (Cloudinary)
export const createCareer = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    // Cloudinary file details
    const fileUrl = req.file.path;
    const fileType = req.file.mimetype.startsWith("image") ? "image" : "video";

    const { category, experience, location, description } = req.body;
    if (!category || !experience || !location || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCareer = new Career({
      fileUrl,
      fileType,
      category,
      experience,
      location,
      description,
    });

    await newCareer.save();
    res.status(201).json({ message: "Career item created successfully", newCareer });
  } catch (error) {
    console.error("Error creating career:", error);
    res.status(500).json({ message: "Failed to create career entry", error });
  }
};

// ✅ Get All Career Entries
export const getAllCareers = async (req, res) => {
  try {
    const careers = await Career.find().sort({ createdAt: -1 });
    res.status(200).json(careers);
  } catch (error) {
    console.error("Error fetching careers:", error);
    res.status(500).json({ message: "Failed to fetch careers", error });
  }
};

// ✅ Edit Career Entry (Replace Old File in Cloudinary)
export const editCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, experience, location, description } = req.body;

    const careerEntry = await Career.findById(id);
    if (!careerEntry) {
      return res.status(404).json({ message: "Career entry not found" });
    }

    if (req.file) {
      // ✅ Extract Cloudinary public ID
      const publicId = careerEntry.fileUrl.split("/").pop().split(".")[0];

      if (publicId) {
        await cloudinary.uploader.destroy(`banners/${publicId}`);
      }

      // ✅ Update file details
      careerEntry.fileUrl = req.file.path;
      careerEntry.fileType = req.file.mimetype.startsWith("image") ? "image" : "video";
    }

    // ✅ Update other fields
    careerEntry.category = category || careerEntry.category;
    careerEntry.experience = experience || careerEntry.experience;
    careerEntry.location = location || careerEntry.location;
    careerEntry.description = description || careerEntry.description;

    await careerEntry.save();
    res.status(200).json({ message: "Career entry updated successfully", careerEntry });
  } catch (error) {
    console.error("Error updating career entry:", error);
    res.status(500).json({ message: "Failed to update career entry", error });
  }
};

// ✅ Delete Career Entry from Cloudinary
export const deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await Career.findById(id);
    if (!career) return res.status(404).json({ message: "Career entry not found" });

    // ✅ Extract Cloudinary public ID
    const publicId = career.fileUrl.split("/").pop().split(".")[0];

    if (publicId) {
      await cloudinary.uploader.destroy(`banners/${publicId}`);
    }

    await career.deleteOne();
    res.status(200).json({ message: "Career entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting career entry:", error);
    res.status(500).json({ message: "Failed to delete career entry", error });
  }
};
