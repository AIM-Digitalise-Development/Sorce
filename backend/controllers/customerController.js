import Customer from "../models/Customer.js";

// ✅ Create a new customer (Form Submission)
export const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCustomer = await Customer.create({ name, email, phone, message });
    res.status(201).json({ message: "Customer data saved successfully", newCustomer });
  } catch (error) {
    res.status(500).json({ message: "Failed to save customer data", error });
  }
};

// ✅ Get all customers
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch customer data", error });
  }
};

// ✅ Delete a customer
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete customer", error });
  }
};