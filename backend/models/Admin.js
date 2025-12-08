import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String }, // ✅ Add this field
});


const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
