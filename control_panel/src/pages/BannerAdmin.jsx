import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const BannerAdmin = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [mediaType, setMediaType] = useState("video");
  const [services, setServices] = useState([
    { name: "Rooms & Facilities", path: "/gallery" },
    { name: "Food & Dining", path: "/gallery" },
    { name: "Security & Services", path: "/gallery" },
  ]);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const { data } = await axios.get("/banner");
        if (data) {
          setBanner(data);
          setTitle(data.title);
          setSubtitle(data.subtitle);
          setMediaType(data.mediaType);
          setServices(data.services);
          setEditMode(true);
        }
      } catch (error) {
        console.error("Failed to fetch banner", error);
      }
    };

    fetchBanner();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };

  const addService = () => {
    setServices([...services, { name: "", path: "" }]);
  };

  const removeService = (index) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !subtitle || !mediaType || services.some(s => !s.name || !s.path)) {
      return alert("Please fill all required fields");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("mediaType", mediaType);
    formData.append("services", JSON.stringify(services));
    if (file) formData.append("file", file);

    setLoading(true);
    try {
      const url = editMode ? `/banner/${banner._id}` : "/banner";
      const method = editMode ? "put" : "post";
      
      await axios[method](url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Refresh banner data
      const { data } = await axios.get("/banner");
      setBanner(data);
      setLoading(false);
      alert("Banner saved successfully");
    } catch (error) {
      console.error("Failed to save banner", error);
      setLoading(false);
      alert("Failed to save banner");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        await axios.delete(`/banner/${banner._id}`);
        setBanner(null);
        resetForm();
        alert("Banner deleted successfully");
      } catch (error) {
        console.error("Failed to delete banner", error);
      }
    }
  };

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setMediaType("video");
    setServices([
      { name: "Rooms & Facilities", path: "/gallery" },
      { name: "Food & Dining", path: "/gallery" },
      { name: "Security & Services", path: "/gallery" },
    ]);
    setFile(null);
    setEditMode(false);
    document.getElementById("fileInput").value = "";
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Banner</h1>

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
            <label className="block mb-2">Subtitle*</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">Media Type*</label>
            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value)}
              className="border p-2 rounded w-full"
              required
            >
              <option value="video">Video</option>
              <option value="image">Image</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">
              Media File* {editMode && "(Leave empty to keep existing file)"}
            </label>
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              className="border p-2 rounded w-full"
              required={!editMode}
              accept={mediaType === 'video' ? 'video/*' : 'image/*'}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Services*</label>
          {services.map((service, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
              <input
                type="text"
                placeholder="Service Name"
                value={service.name}
                onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Path (e.g., /gallery)"
                value={service.path}
                onChange={(e) => handleServiceChange(index, 'path', e.target.value)}
                className="border p-2 rounded"
                required
              />
              <button
                type="button"
                onClick={() => removeService(index)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addService}
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Add Service
          </button>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded ${editMode ? "bg-green-600" : "bg-blue-600"} text-white`}
          >
            {loading ? "Saving..." : "Save Banner"}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 rounded bg-red-600 text-white"
            >
              Delete Banner
            </button>
          )}
        </div>
      </form>

      {banner && (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Current Banner Preview</h2>
          <div className="relative">
            {banner.mediaType === 'video' ? (
              <video
                src={banner.mediaUrl}
                autoPlay
                loop
                muted
                className="w-full h-64 object-cover"
              />
            ) : (
              <img
                src={banner.mediaUrl}
                alt="Banner Preview"
                className="w-full h-64 object-cover"
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h3 className="text-xl font-bold">{banner.title}</h3>
              <p>{banner.subtitle}</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-bold">Services:</h3>
            <ul className="flex flex-wrap gap-2 mt-2">
              {banner.services.map((service, index) => (
                <li key={index} className="bg-gray-100 px-3 py-1 rounded">
                  {service.name} ({service.path})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerAdmin;