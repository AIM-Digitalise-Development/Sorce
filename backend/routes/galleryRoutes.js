import express from "express";
import { upload } from "../middleware/upload.js";
import {
  createGalleryItem,
  getGalleryItems,
  updateGalleryItem,
  deleteGalleryItem,
} from "../controllers/galleryController.js";

const router = express.Router();

router.post("/gallery", upload.single('image'), createGalleryItem);
router.get("/gallery", getGalleryItems);
router.put("/gallery/:id", upload.single('image'), updateGalleryItem);
router.delete("/gallery/:id", deleteGalleryItem);

export default router;