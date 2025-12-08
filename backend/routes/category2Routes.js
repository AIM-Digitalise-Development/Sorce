import express from "express";
import { upload } from "../middleware/upload.js";
import { createCategory2, getAllCategories2, editCategory2, deleteCategory2 } from "../controllers/category2Controller.js";

const router = express.Router();

// ✅ CRUD Routes for Category
router.post("/categories2", upload.single("file"), createCategory2);
router.get("/categories2", getAllCategories2);
router.put("/categories2/:id", upload.single("file"), editCategory2);
router.delete("/categories2/:id", deleteCategory2);

export default router;
