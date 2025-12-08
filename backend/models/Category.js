import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Each category should have a unique name
    },
    fileUrl: {
      type: String, // Image URL
      required: true,
    },
    text: {
      type: String, // Description text
      required: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
