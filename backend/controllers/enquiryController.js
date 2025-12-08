import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Enquiry from "../models/Enquiry.js";

dotenv.config();

// 🔹 Setup Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) console.error("❌ SMTP Error:", error);
  else console.log("✅ SMTP ready for sending emails");
});

// 🔹 Controller for handling enquiries
export const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !phone || !service || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Save to DB
    const enquiry = await Enquiry.create({ name, email, phone, service, message });

    // 📤 Email to admin
    const adminMail = {
      from: `"Website Enquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Enquiry from ${name}`,
      html: `
        <h2>New Enquiry Received</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    };

    await transporter.sendMail(adminMail);

    // 📩 Confirmation to user
    const userMail = {
      from: `"Medical" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your enquiry!",
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for reaching out about <b>${service}</b>. Our team will contact you shortly.</p>
        <br/>
        <p>Best regards,<br><b>Medical Team</b></p>
      `,
    };

    await transporter.sendMail(userMail);

    res.status(201).json({
      message: "Enquiry submitted successfully",
      enquiry,
    });
  } catch (error) {
    console.error("Error creating enquiry:", error);
    res.status(500).json({ message: "Failed to submit enquiry", error });
  }
};

// 🔹 Get all enquiries (for admin viewing)
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({ message: "Failed to fetch enquiries", error });
  }
};
