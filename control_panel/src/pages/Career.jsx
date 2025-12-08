import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { FaTrash, FaEdit } from "react-icons/fa";

const CareerGallery = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [careerItems, setCareerItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null); // Track if editing

  const categories = ["Interior Designers", "Exterior Designers/Facade Specialists", "MEP/HVAC Engineers", "Glazing and Cladding Specialists"];

  useEffect(() => {
    fetchCareerItems();
  }, []);

  // Fetch Career Items
  const fetchCareerItems = async () => {
    try {
      const { data } = await axios.get("/careers");
      setCareerItems(data);
    } catch (error) {
      console.error("Failed to fetch career items", error);
    }
  };

  // Handle Upload & Update
  const handleUpload = async (e) => {
    e.preventDefault();
  
    if (!category || !experience || !location || !description) {
      return alert("Please fill out all fields!");
    }
  
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("category", category);
    formData.append("experience", experience);
    formData.append("location", location);
    formData.append("description", description);
  
    setLoading(true);
  
    try {
      const headers = file
        ? { "Content-Type": "multipart/form-data" }
        : {}; // Ensure headers are correct
  
      if (editId) {
        // Edit Existing Career Entry
        await axios.put(`/careers/${editId}`, formData, { headers });
        alert("Career entry updated successfully!");
      } else {
        // Add New Career Entry
        await axios.post("/careers", formData, { headers });
        alert("Career entry uploaded successfully!");
      }
  
      resetForm();
      fetchCareerItems();
    } catch (error) {
      console.error("Failed to save career item:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };
  

  // Handle Delete Career Entry
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`/careers/${id}`);
        fetchCareerItems();
      } catch (error) {
        console.error("Failed to delete career item", error);
      }
    }
  };

  // Handle Edit Career Entry (Prefill Form)
  const handleEdit = (item) => {
    setEditId(item._id);
    setCategory(item.category);
    setExperience(item.experience);
    setLocation(item.location);
    setDescription(item.description);
    setFile(null); // Clear file input, as it may not be changed
  };

  // Reset Form
  const resetForm = () => {
    setEditId(null);
    setCategory("");
    setExperience("");
    setLocation("");
    setDescription("");
    setFile(null);
    document.getElementById("fileInput").value = "";
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Career Gallery</h1>

      {/* Upload / Edit Form */}
      <form onSubmit={handleUpload} className="mb-8 space-y-4">
        <input
          id="fileInput"
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded w-full"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-blue-500 text-white w-full"
        >
          {loading ? "Processing..." : editId ? "Update Career" : "Upload Career"}
        </button>

        {editId && (
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 rounded bg-gray-400 text-white w-full mt-2"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* Career Items Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-100">Preview</th>
              <th className="py-3 px-6 bg-gray-100">Category</th>
              <th className="py-3 px-6 bg-gray-100">Experience</th>
              <th className="py-3 px-6 bg-gray-100">Location</th>
              <th className="py-3 px-6 bg-gray-100">Description</th>
              <th className="py-3 px-6 bg-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {careerItems.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="py-3 px-6">
                  {item.fileType === "image" ? (
                    <img
                      src={item.fileUrl}
                      alt="career"
                      className="w-32 h-20 object-cover rounded"
                    />
                  ) : (
                    <video
                      src={item.fileUrl}
                      className="w-32 h-20 object-cover rounded"
                      controls
                    />
                  )}
                </td>
                <td className="py-3 px-6 text-center">{item.category}</td>
                <td className="py-3 px-6 text-center">{item.experience}</td>
                <td className="py-3 px-6 text-center">{item.location}</td>
                <td className="py-3 px-6">{item.description}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CareerGallery;
