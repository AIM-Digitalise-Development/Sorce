import express from "express";
import { upload } from "../middleware/upload.js";
import { uploadClientImage, getAllClientImages, deleteClientImage } from "../controllers/clientController.js";

const router = express.Router();

// ✅ Routes for Client Image Upload
router.post("/clients", upload.single("file"), uploadClientImage);
router.get("/clients", getAllClientImages);
router.delete("/clients/:id", deleteClientImage);

export default router;
