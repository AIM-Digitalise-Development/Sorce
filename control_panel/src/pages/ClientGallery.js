import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { FaTrash } from "react-icons/fa";

const ClientGallery = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔄 Fetch all images
  const fetchImages = async () => {
    try {
      const { data } = await axios.get("/clients");
      setImages(data);
    } catch (error) {
      console.error("Failed to fetch images", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // ✅ Upload Image
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      await axios.post("/clients", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Reset input after upload
      setFile(null);
      document.getElementById("fileInput").value = "";

      fetchImages(); // Refresh image list
    } catch (error) {
      console.error("Failed to upload image", error);
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete Image
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await axios.delete(`/clients/${id}`);
        fetchImages();
      } catch (error) {
        console.error("Failed to delete image", error);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Client Gallery</h1>

      {/* 📁 Upload Form */}
      <form onSubmit={handleUpload} className="mb-8">
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
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      {/* 📋 Images Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-100">Preview</th>
              <th className="py-3 px-6 bg-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image) => (
              <tr key={image._id} className="border-b">
                <td className="py-3 px-6 text-center">
                  <img
                    src={`https://sorce.onrender.com${image.fileUrl}`}
                    alt="client"
                    className="w-32 h-20 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleDelete(image._id)}
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

export default ClientGallery;
