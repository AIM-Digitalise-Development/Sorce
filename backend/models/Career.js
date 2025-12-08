import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    fileUrl: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    category: {
      type: String,
      enum: ["Interior Designers", "Exterior Designers/Facade Specialists", "MEP/HVAC Engineers", "Glazing and Cladding Specialists"],
      required: true,
    },
    experience: {
        type: String, 
        required: true,
      },
      location: {
        type: String, 
        required: true,
      },
      description: {
        type: String, 
        required: true,
      },
  },
  { timestamps: true }
);

const Career = mongoose.model("Career", careerSchema);
export default Career;
