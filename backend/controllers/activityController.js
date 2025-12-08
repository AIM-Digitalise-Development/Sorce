import Activity from "../models/Activity.js";
import cloudinary from "../config/cloudinary.js";

export const createActivity = async (req, res) => {
  try {
    const { title, description, category } = req.body; // 🆕 added category

    if (!title || !description || !category || !req.file) { // 🆕 category validation
      return res.status(400).json({ message: "All fields are required" });
    }

    const activity = await Activity.create({
      title,
      description,
      category, // 🆕 save category
      image: req.file.path,
    });

    res.status(201).json({ message: "Activity created successfully", activity });
  } catch (error) {
    console.error("Error creating activity:", error);
    res.status(500).json({ message: "Failed to create activity", error });
  }
};

export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ isActive: true });
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ message: "Failed to fetch activities", error });
  }
};

export const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body; // 🆕 added category

    const activity = await Activity.findById(id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    let image = activity.image;
    if (req.file) {
      const publicId = activity.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`activities/${publicId}`);
      image = req.file.path;
    }

    activity.title = title || activity.title;
    activity.description = description || activity.description;
    activity.category = category || activity.category; // 🆕 update category
    activity.image = image;

    await activity.save();
    res.status(200).json({ message: "Activity updated successfully", activity });
  } catch (error) {
    console.error("Error updating activity:", error);
    res.status(500).json({ message: "Failed to update activity", error });
  }
};

export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    const publicId = activity.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`activities/${publicId}`);

    activity.isActive = false;
    await activity.save();

    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.error("Error deleting activity:", error);
    res.status(500).json({ message: "Failed to delete activity", error });
  }
};
