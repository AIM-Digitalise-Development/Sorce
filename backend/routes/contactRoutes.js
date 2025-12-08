import express from "express";
import multer from "multer";
import ContactPage from "../models/ContactPage.js";
import CustomerForm from "../models/CustomerForm.js";

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Get Contact Page Data
router.get("/contact-page", async (req, res) => {
  const data = await ContactPage.findOne();
  res.json(data);
});

// Update Contact Page Data
router.post("/contact-page", upload.single("bannerImage"), async (req, res) => {
  let { bannerText, subText, phone, email, location } = req.body;
  let bannerImage = req.file ? `/uploads/${req.file.filename}` : "";

  let contactData = await ContactPage.findOne();
  if (!contactData) {
    contactData = new ContactPage({ bannerImage, bannerText, subText, phone, email, location });
  } else {
    if (bannerImage) contactData.bannerImage = bannerImage;
    contactData.bannerText = bannerText;
    contactData.subText = subText;
    contactData.phone = phone;
    contactData.email = email;
    contactData.location = location;
  }

  await contactData.save();
  res.json({ message: "Contact Page Updated Successfully!" });
});

// Submit Customer Form
router.post("/customer-form", async (req, res) => {
  const newForm = new CustomerForm(req.body);
  await newForm.save();
  res.json({ message: "Form submitted successfully!" });
});

// Get All Customer Form Submissions
router.get("/customer-forms", async (req, res) => {
  const forms = await CustomerForm.find();
  res.json(forms);
});

export default router;
