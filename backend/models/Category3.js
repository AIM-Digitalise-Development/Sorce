import mongoose from "mongoose";

const category3Schema = new mongoose.Schema(
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

const Category3 = mongoose.model("Category3", category3Schema);
export default Category3;
