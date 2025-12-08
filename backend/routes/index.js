import express from "express";
import bannerRoutes from "./bannerRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import category2Routes from "./category2Routes.js";
import category3Routes from "./category3Routes.js";
import adminRoutes from "./adminRoutes.js";
import galleryRoutes from "./galleryRoutes.js";
import clientRoutes from "./clientRoutes.js";
import careerRoutes from "./careerRoutes.js";  
import customerRoutes from "./customerRoutes.js";
import teamRoutes from "./teamRoutes.js";
import activityRoutes from "./activityRoutes.js"; 
import reviewRoutes from "./reviewRoutes.js";
import enquiryRoutes from "./enquiryRoutes.js";


const router = express.Router();

router.use("/api", bannerRoutes);
router.use("/api", categoryRoutes);
router.use("/api", category2Routes);
router.use("/api", category3Routes);
router.use("/api/admin", adminRoutes);
router.use("/api", galleryRoutes);
router.use("/api", clientRoutes);
router.use("/api", careerRoutes);  
router.use("/api", customerRoutes);
router.use("/api", teamRoutes);
router.use("/api", activityRoutes);
router.use("/api", reviewRoutes);
router.use("/api", enquiryRoutes);


export default router;
