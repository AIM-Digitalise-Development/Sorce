import express from "express";
import { upload } from "../middleware/upload.js"; // Middleware for file uploads
import { createTeamMember, getAllTeamMembers, editTeamMember, deleteTeamMember } from "../controllers/teamController.js";

const router = express.Router();

// ✅ CRUD Routes for Team Members
router.post("/team", upload.single("image"), createTeamMember);
router.get("/team", getAllTeamMembers);
router.put("/team/:id", upload.single("image"), editTeamMember);
router.delete("/team/:id", deleteTeamMember);

export default router;
