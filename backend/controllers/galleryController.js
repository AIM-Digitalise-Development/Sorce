import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";

export const createGalleryItem = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title || !category || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const galleryItem = await Gallery.create({
      title,
      image: req.file.path,
      category
    });

    res.status(201).json({ message: "Gallery item created successfully", galleryItem });
  } catch (error) {
    console.error("Error creating gallery item:", error);
    res.status(500).json({ message: "Failed to create gallery item", error });
  }
};

export const getGalleryItems = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category, isActive: true } : { isActive: true };
    
    const galleryItems = await Gallery.find(query).sort({ createdAt: -1 });
    res.status(200).json(galleryItems);
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    res.status(500).json({ message: "Failed to fetch gallery items", error });
  }
};

export const updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category } = req.body;

    const galleryItem = await Gallery.findById(id);
    if (!galleryItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    let image = galleryItem.image;
    if (req.file) {
      // Delete old image from cloudinary
      const publicId = galleryItem.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`gallery/${publicId}`);
      image = req.file.path;
    }

    galleryItem.title = title || galleryItem.title;
    galleryItem.category = category || galleryItem.category;
    galleryItem.image = image;

    await galleryItem.save();
    res.status(200).json({ message: "Gallery item updated successfully", galleryItem });
  } catch (error) {
    console.error("Error updating gallery item:", error);
    res.status(500).json({ message: "Failed to update gallery item", error });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const galleryItem = await Gallery.findById(id);

    if (!galleryItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    // Delete image from cloudinary
    const publicId = galleryItem.image.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`gallery/${publicId}`);

    // Soft delete
    galleryItem.isActive = false;
    await galleryItem.save();

    res.status(200).json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    res.status(500).json({ message: "Failed to delete gallery item", error });
  }
};