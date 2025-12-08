import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { FaTrash } from "react-icons/fa";

const Client = () => {
  const [file, setFile] = useState(null);
  const [clientItems, setClientItems] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchClient = async () => {
    try {
      const { data } = await axios.get("/clients");
      setClientItems(data);
    } catch (error) {
      console.error("Failed to fetch gallery items", error);
    }
  };

  useEffect(() => {
    fetchClient();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      await axios.post("/clients", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFile(null);
      document.getElementById("fileInput").value = "";

      fetchClient();
    } catch (error) {
      console.error("Failed to upload client item", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`/clients/${id}`);
        fetchClient();
      } catch (error) {
        console.error("Failed to delete client item", error);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Clients</h1>

      <form onSubmit={handleUpload} className="mb-8">
        <input
          id="fileInput"
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded mr-4"
        />

       

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-blue-500 text-white"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-100">Preview</th>
              <th className="py-3 px-6 bg-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clientItems.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="py-3 px-6">
                 
                    <img
                      src={item.fileUrl}
                      alt="gallery"
                      className="w-32 h-20 object-cover rounded"
                    />
                  
                </td>
                <td className="py-3 px-6 text-center">
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

export default Client;