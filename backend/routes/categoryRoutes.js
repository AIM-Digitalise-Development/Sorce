import express from "express";
import { upload } from "../middleware/upload.js";
import { createCategory, getAllCategories, editCategory, deleteCategory } from "../controllers/categoryController.js";

const router = express.Router();

// ✅ CRUD Routes for Category
router.post("/categories", upload.single("file"), createCategory);
router.get("/categories", getAllCategories);
router.put("/categories/:id", upload.single("file"), editCategory);
router.delete("/categories/:id", deleteCategory);

export default router;
