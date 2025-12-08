import express from "express";
import { upload } from "../middleware/upload.js";
import {
  createBanner,
  getActiveBanner,
  updateBanner,
  deleteBanner,
} from "../controllers/bannerController.js";

const router = express.Router();

router.post("/banner", upload.single('file'), createBanner);
router.get("/banner", getActiveBanner);
router.put("/banner/:id", upload.single('file'), updateBanner);
router.delete("/banner/:id", deleteBanner);

export default router;