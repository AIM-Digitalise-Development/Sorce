import Testimonial from "../models/Testimonial.js";

export const createTestimonial = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debug log
    const { name, text, rating } = req.body;

    if (!name || !text || !rating) {
      console.log("Validation failed"); // Debug log
      return res.status(400).json({ message: "All fields are required" });
    }

    const testimonial = await Testimonial.create({
      name,
      text,
      rating,
    });

    console.log("Testimonial created:", testimonial); // Debug log
    res.status(201).json({ 
      success: true,
      message: "Testimonial created successfully", 
      testimonial 
    });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to create testimonial", 
      error: error.message 
    });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({ message: "Failed to fetch testimonials", error });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, text, rating } = req.body;

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    testimonial.name = name || testimonial.name;
    testimonial.text = text || testimonial.text;
    testimonial.rating = rating || testimonial.rating;

    await testimonial.save();
    res.status(200).json({ message: "Testimonial updated successfully", testimonial });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    res.status(500).json({ message: "Failed to update testimonial", error });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    // Soft delete
    testimonial.isActive = false;
    await testimonial.save();

    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    res.status(500).json({ message: "Failed to delete testimonial", error });
  }
};