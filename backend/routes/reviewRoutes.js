import express from "express";
import { upload } from "../middleware/upload.js";
import {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/reviews", upload.single("image"), createReview);
router.get("/reviews", getAllReviews);
router.put("/reviews/:id", upload.single("image"), updateReview);
router.delete("/reviews/:id", deleteReview);

export default router;