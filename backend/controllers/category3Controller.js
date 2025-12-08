import Category from "../models/Category3.js";
import cloudinary from "../config/cloudinary.js";

// ✅ Create Category with Image (Cloudinary)
export const createCategory3 = async (req, res) => {
  try {
    const { name, text } = req.body;
    if (!req.file || !name || !text) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const fileUrl = req.file.path; // Cloudinary returns file URL

    const category = await Category.create({ name, fileUrl, text });
    res.status(201).json({ message: "Category created successfully", category });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ message: "Failed to create category", error });
  }
};

// ✅ Get All Categories
export const getAllCategories3 = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories", error });
  }
};

// ✅ Edit Category (Update Image and Text on Cloudinary)
export const editCategory3 = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, text } = req.body;
    const category = await Category.findById(id);

    if (!category) return res.status(404).json({ message: "Category not found" });

    if (req.file) {
      // ✅ Extract Cloudinary public ID properly
      const publicId = category.fileUrl.split("/").pop().split(".")[0];

      if (publicId) {
        await cloudinary.uploader.destroy(`banners/${publicId}`);
      }

      // ✅ Multer has already uploaded a new file, just update the DB
      category.fileUrl = req.file.path;
    }

    category.name = name || category.name;
    category.text = text || category.text;

    await category.save();
    res.status(200).json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Failed to update category", error });
  }
};

// ✅ Delete Category from Cloudinary
export const deleteCategory3 = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    // ✅ Extract Cloudinary public ID properly
    const publicId = category.fileUrl.split("/").pop().split(".")[0];

    if (publicId) {
      await cloudinary.uploader.destroy(`banners/${publicId}`);
    }

    await category.deleteOne();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Failed to delete category", error });
  }
};
