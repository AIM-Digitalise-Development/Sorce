import express from "express";
import { upload } from "../middleware/upload.js";
import { createCategory3, getAllCategories3, editCategory3, deleteCategory3 } from "../controllers/category3Controller.js";

const router = express.Router();

// ✅ CRUD Routes for Category
router.post("/categories3", upload.single("file"), createCategory3);
router.get("/categories3", getAllCategories3);
router.put("/categories3/:id", upload.single("file"), editCategory3);
router.delete("/categories3/:id", deleteCategory3);

export default router;
