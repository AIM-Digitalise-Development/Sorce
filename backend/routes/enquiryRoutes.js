import express from "express";
import { createEnquiry, getAllEnquiries } from "../controllers/enquiryController.js";

const router = express.Router();

// Submit enquiry
router.post("/enquiry", createEnquiry);

// Get all enquiries (admin)
router.get("/enquiry", getAllEnquiries);

export default router;
