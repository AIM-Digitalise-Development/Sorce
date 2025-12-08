import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { FaTrash, FaEdit } from "react-icons/fa";

const Category = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [editMode, setEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  // 🔄 Fetch all categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Upload category
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("text", text);

    setLoading(true);
    try {
      await axios.post("/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Clear inputs after successful upload
      setFile(null);
      setName("");
      setText("");

      // ✅ Reset file input manually
      document.getElementById("fileInput").value = "";

      fetchCategories(); // Refresh category list
    } catch (error) {
      console.error("Failed to upload category", error);
    } finally {
      setLoading(false);
    }
  };

  // 📝 Edit category
  const handleEdit = (category) => {
    setEditMode(true);
    setEditCategoryId(category._id);
    setName(category.name);
    setText(category.text);
    setFile(null); // Reset file input
  };

  // ✅ Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name || !text) return alert("Name and text cannot be empty!");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("text", text);
    if (file) formData.append("file", file); // Include file only if changed

    setLoading(true);
    try {
      await axios.put(`/categories/${editCategoryId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Reset form after update
      setEditMode(false);
      setEditCategoryId(null);
      setName("");
      setText("");
      setFile(null);
      document.getElementById("fileInput").value = "";

      fetchCategories(); // Refresh category list
    } catch (error) {
      console.error("Failed to update category", error);
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete category
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`/categories/${id}`);
        fetchCategories();
      } catch (error) {
        console.error("Failed to delete category", error);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Interior Services</h1>

      {/* 📁 Upload / Edit Form */}
      <form onSubmit={editMode ? handleUpdate : handleUpload} className="mb-8">
        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded mr-4"
          required
        />
        <input
          type="text"
          placeholder="Enter description"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 rounded mr-4"
          required
        />
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded mr-4"
        />

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded ${editMode ? "bg-green-500" : "bg-blue-500"} text-white`}
        >
          {loading ? (editMode ? "Updating..." : "Uploading...") : editMode ? "Update Category" : "Upload Category"}
        </button>
        
        {editMode && (
          <button
            type="button"
            onClick={() => {
              setEditMode(false);
              setEditCategoryId(null);
              setName("");
              setText("");
              setFile(null);
              document.getElementById("fileInput").value = "";
            }}
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      {/* 📋 Categories Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-100">Preview</th>
              <th className="py-3 px-6 bg-gray-100">Name</th>
              <th className="py-3 px-6 bg-gray-100">Description</th>
              <th className="py-3 px-6 bg-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="border-b">
                <td className="py-3 px-6">
                  <img
                    src={category.fileUrl}
                    alt="category"
                    className="w-32 h-20 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-6 text-center">{category.name}</td>
                <td className="py-3 px-6 text-center">{category.text}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleEdit(category)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
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

export default Category;
