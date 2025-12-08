import Banner from "../models/Banner.js";
import cloudinary from "../config/cloudinary.js";

export const createBanner = async (req, res) => {
  try {
    const { title, subtitle, mediaType, services } = req.body;

    if (!title || !subtitle || !mediaType || !services || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Parse services if it's a string
    let servicesArray;
    try {
      servicesArray = typeof services === 'string' ? JSON.parse(services) : services;
    } catch (error) {
      return res.status(400).json({ message: "Invalid services format" });
    }

    const banner = await Banner.create({
      title,
      subtitle,
      mediaType,
      mediaUrl: req.file.path,
      services: servicesArray,
    });

    res.status(201).json({ message: "Banner created successfully", banner });
  } catch (error) {
    console.error("Error creating banner:", error);
    res.status(500).json({ message: "Failed to create banner", error });
  }
};

export const getActiveBanner = async (req, res) => {
  try {
    const banner = await Banner.findOne({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json(banner);
  } catch (error) {
    console.error("Error fetching banner:", error);
    res.status(500).json({ message: "Failed to fetch banner", error });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, mediaType, services } = req.body;

    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    // Parse services if it's a string
    let servicesArray;
    try {
      servicesArray = typeof services === 'string' ? JSON.parse(services) : services;
    } catch (error) {
      return res.status(400).json({ message: "Invalid services format" });
    }

    let mediaUrl = banner.mediaUrl;
    if (req.file) {
      // Delete old media from cloudinary
      const publicId = banner.mediaUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`banner/${publicId}`);
      mediaUrl = req.file.path;
    }

    banner.title = title || banner.title;
    banner.subtitle = subtitle || banner.subtitle;
    banner.mediaType = mediaType || banner.mediaType;
    banner.mediaUrl = mediaUrl;
    banner.services = servicesArray || banner.services;

    await banner.save();
    res.status(200).json({ message: "Banner updated successfully", banner });
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({ message: "Failed to update banner", error });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    // Delete media from cloudinary
    const publicId = banner.mediaUrl.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`banner/${publicId}`);

    // Soft delete
    banner.isActive = false;
    await banner.save();

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    console.error("Error deleting banner:", error);
    res.status(500).json({ message: "Failed to delete banner", error });
  }
};