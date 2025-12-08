import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    fileUrl: {
      type: String, // Image URL
      required: true,
    },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);
export default Client;
