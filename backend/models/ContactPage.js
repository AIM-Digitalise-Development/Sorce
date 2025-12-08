import mongoose from "mongoose";

const ContactPageSchema = new mongoose.Schema({
  bannerImage: String,
  bannerText: String,
  subText: String,
  phone: String,
  email: String,
  location: String,
});

const ContactPage = mongoose.model("ContactPage", ContactPageSchema);

export default ContactPage;
