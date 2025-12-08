import Review from "../models/Review.js";
import cloudinary from "../config/cloudinary.js";

export const createReview = async (req, res) => {
  try {
    const { name, review, rating, designation } = req.body;
    
    if (!name || !review || !rating || !req.file) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const reviewDoc = await Review.create({
      name,
      review,
      rating,
      designation: designation || "Happy Customer",
      imageUrl: req.file.path
    });

    res.status(201).json({ message: "Review created successfully", review: reviewDoc });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Failed to create review", error });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Failed to fetch reviews", error });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, review, rating, designation } = req.body;
    const reviewDoc = await Review.findById(id);

    if (!reviewDoc) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (req.file) {
      const publicId = reviewDoc.imageUrl.split("/").pop().split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`reviews/${publicId}`);
      }
      reviewDoc.imageUrl = req.file.path;
    }

    reviewDoc.name = name || reviewDoc.name;
    reviewDoc.review = review || reviewDoc.review;
    reviewDoc.rating = rating || reviewDoc.rating;
    reviewDoc.designation = designation || reviewDoc.designation;

    await reviewDoc.save();
    res.status(200).json({ message: "Review updated successfully", review: reviewDoc });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Failed to update review", error });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const reviewDoc = await Review.findById(id);
    
    if (!reviewDoc) {
      return res.status(404).json({ message: "Review not found" });
    }

    const publicId = reviewDoc.imageUrl.split("/").pop().split(".")[0];
    if (publicId) {
      await cloudinary.uploader.destroy(`reviews/${publicId}`);
    }

    await reviewDoc.deleteOne();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Failed to delete review", error });
  }
};