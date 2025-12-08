import express from "express";
import { createCustomer, getAllCustomers, deleteCustomer } from "../controllers/customerController.js";

const router = express.Router();

// ✅ Route to submit the form (POST)
router.post("/customers", createCustomer);

// ✅ Route to get all customer entries (GET)
router.get("/customers", getAllCustomers);

router.delete("/customers/:id", deleteCustomer);

export default router;
