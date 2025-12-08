import mongoose from "mongoose";

const category2Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, 
    },
    fileUrl: {
      type: String, 
      required: true,
    },
    text: {
      type: String, 
      required: true,
    },
  },
  { timestamps: true }
);

const Category2 = mongoose.model("Category2", category2Schema);
export default Category2;
