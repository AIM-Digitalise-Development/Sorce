import express from "express";
import { upload } from "../middleware/upload.js";
import { createCareer, getAllCareers, editCareer, deleteCareer } from "../controllers/careerController.js";

const router = express.Router();

// ✅ CRUD Routes for Career
router.post("/careers", upload.single("file"), createCareer);
router.get("/careers", getAllCareers);
router.put("/careers/:id", upload.single("file"), editCareer);
router.delete("/careers/:id", deleteCareer);

export default router;
