import mongoose from "mongoose";

const CustomerFormSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  propertyName: String,
  submittedAt: { type: Date, default: Date.now },
});

const CustomerForm = mongoose.model("CustomerForm", CustomerFormSchema);

export default CustomerForm;
