import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import routes from "./routes/index.js";
import path from "path";
import cors from "cors";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";
 
dotenv.config();
const app = express();
 
// Connect to database
connectDB();
 
// ✅ Auto-create admin on server start
const createInitialAdmin = async () => {
  try {
    const email = "scan@gmail.com";
    const password = "Admindd@12345";
 
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("✅ Admin user already exists");
      return;
    }
 
    // Create new admin
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      email,
      password: hashedPassword,
      refreshToken: ""
    });
   
    await admin.save();
    console.log("✅ Initial admin user created successfully!");
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
   
  } catch (error) {
    console.error("❌ Error creating initial admin:", error.message);
  }
};
 
// Wait for DB connection then create admin
setTimeout(createInitialAdmin, 2000);
 
app.use(
  cors({
    origin: "*", // Change to specific domain if needed
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies & authorization headers
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads"))); // Serve files
app.use("/", routes);
 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));