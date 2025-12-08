import express from "express";
import { upload } from "../middleware/upload.js";
import {
  createActivity,
  getActivities,
  updateActivity,
  deleteActivity,
} from "../controllers/activityController.js";

const router = express.Router();

router.post("/activities", upload.single('image'), createActivity);
router.get("/activities", getActivities);
router.put("/activities/:id", upload.single('image'), updateActivity);
router.delete("/activities/:id", deleteActivity);

export default router;