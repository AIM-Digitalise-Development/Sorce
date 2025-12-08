import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { FaTrash, FaEdit, FaChevronDown } from "react-icons/fa";

const ActivitiesAdmin = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [activities, setActivities] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editActivityId, setEditActivityId] = useState(null);

  // Fetch all activities & categories
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data } = await axios.get("/activities");
        setActivities(data);

        // extract unique categories
        const uniqueCategories = [
          ...new Set(data.map((item) => item.category).filter(Boolean)),
        ];
        setAllCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch activities", error);
      }
    };

    fetchActivities();
  }, []);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleCategoryChange = (e) => {
    const input = e.target.value;
    setCategory(input);
    if (input.length > 0) {
      const filtered = allCategories.filter((cat) =>
        cat.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredCategories(filtered);
      setShowDropdown(true);
    } else {
      setFilteredCategories(allCategories);
      setShowDropdown(false);
    }
  };

  const selectCategory = (cat) => {
    setCategory(cat);
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category || (!editMode && !file)) {
      return alert("Please fill all required fields");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    if (file) formData.append("image", file);

    setLoading(true);
    try {
      const url = editMode ? `/activities/${editActivityId}` : "/activities";
      const method = editMode ? "put" : "post";

      await axios[method](url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      resetForm();
      const { data } = await axios.get("/activities");
      setActivities(data);

      // refresh category list
      const uniqueCategories = [
        ...new Set(data.map((item) => item.category).filter(Boolean)),
      ];
      setAllCategories(uniqueCategories);
    } catch (error) {
      console.error("Failed to save activity", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (activity) => {
    setEditMode(true);
    setEditActivityId(activity._id);
    setTitle(activity.title);
    setDescription(activity.description);
    setCategory(activity.category || "");
    setFile(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      try {
        await axios.delete(`/activities/${id}`);
        const { data } = await axios.get("/activities");
        setActivities(data);
      } catch (error) {
        console.error("Failed to delete activity", error);
      }
    }
  };

  const resetForm = () => {
    setEditMode(false);
    setEditActivityId(null);
    setTitle("");
    setDescription("");
    setCategory("");
    setFile(null);
    document.getElementById("fileInput").value = "";
  };

  return (
    <div className="p-6 relative">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded shadow relative">
        <div className="mb-4">
          <label className="block mb-2">Title*</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Description*</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full"
            rows="3"
            required
          />
        </div>

        {/* Category with dropdown */}
        <div className="mb-4 relative">
          <label className="block mb-2">Category*</label>
          <div className="relative">
            <input
              type="text"
              value={category}
              onChange={handleCategoryChange}
              onFocus={() => setShowDropdown(true)}
              className="border p-2 rounded w-full"
              placeholder="Enter or select category"
              required
            />
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              <FaChevronDown />
            </button>
          </div>

          {showDropdown && filteredCategories.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-40 overflow-y-auto shadow-lg">
              {filteredCategories.map((cat, idx) => (
                <li
                  key={idx}
                  onClick={() => selectCategory(cat)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
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
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded ${
              editMode ? "bg-green-600" : "bg-blue-600"
            } text-white`}
          >
            {loading
              ? editMode
                ? "Updating..."
                : "Creating..."
              : editMode
              ? "Update Activity"
              : "Create Activity"}
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

      {/* Activity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <div
            key={activity._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{activity.title}</h3>
              <p className="text-gray-600 mt-2">{activity.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                <b>Category:</b> {activity.category || "N/A"}
              </p>

              <div className="flex justify-end mt-4 gap-2">
                <button
                  onClick={() => handleEdit(activity)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(activity._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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

export default ActivitiesAdmin;
