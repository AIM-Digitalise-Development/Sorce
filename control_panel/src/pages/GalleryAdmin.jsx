import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const GalleryAdmin = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("projects");
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const { data } = await axios.get("/gallery");
        setGalleryItems(data);
      } catch (error) {
        console.error("Failed to fetch gallery items", error);
      }
    };

    fetchGalleryItems();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || (!editMode && !file)) {
      return alert("Please fill all required fields");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    if (file) formData.append("image", file);

    setLoading(true);
    try {
      const url = editMode ? `/gallery/${editItemId}` : "/gallery";
      const method = editMode ? "put" : "post";
      
      await axios[method](url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      resetForm();
      const { data } = await axios.get("/gallery");
      setGalleryItems(data);
    } catch (error) {
      console.error("Failed to save gallery item", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setEditItemId(item._id);
    setTitle(item.title);
    setCategory(item.category);
    setFile(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this gallery item?")) {
      try {
        await axios.delete(`/gallery/${id}`);
        const { data } = await axios.get("/gallery");
        setGalleryItems(data);
      } catch (error) {
        console.error("Failed to delete gallery item", error);
      }
    }
  };

  const resetForm = () => {
    setEditMode(false);
    setEditItemId(null);
    setTitle("");
    setCategory("projects");
    setFile(null);
    document.getElementById("fileInput").value = "";
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Gallery</h1>

      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">Title*</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Category*</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 rounded w-full"
              required
            >
              <option value="events">Events</option>
              <option value="happy customers">Happy Cutomers</option>
              <option value="activities">Activities</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Image* {editMode && "(Leave empty to keep existing image)"}
          </label>
          <input
            id="fileInput"
            type="file"
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
            required={!editMode}
            accept="image/*"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded ${editMode ? "bg-green-600" : "bg-blue-600"} text-white`}
          >
            {loading ? (editMode ? "Updating..." : "Creating...") : editMode ? "Update Item" : "Add Item"}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded bg-gray-500 text-white"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryItems.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-600 capitalize">{item.category}</p>
              <div className="flex justify-end mt-3 gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryAdmin;