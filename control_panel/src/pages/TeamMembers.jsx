import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { FaTrash, FaEdit } from "react-icons/fa";

const TeamMembers = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [editMode, setEditMode] = useState(false);
  const [editMemberId, setEditMemberId] = useState(null);

  // 🔄 Fetch all team members
  const fetchTeamMembers = async () => {
    try {
      const { data } = await axios.get("/team");
      setTeamMembers(data);
    } catch (error) {
      console.error("Failed to fetch team members", error);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  // ✅ Upload team member
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("role", role);

    setLoading(true);
    try {
      await axios.post("/team", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Clear inputs after successful upload
      setFile(null);
      setName("");
      setRole("");

      // ✅ Reset file input manually
      document.getElementById("fileInput").value = "";

      fetchTeamMembers(); // Refresh team list
    } catch (error) {
      console.error("Failed to upload team member", error);
    } finally {
      setLoading(false);
    }
  };

  // 📝 Edit team member
  const handleEdit = (member) => {
    setEditMode(true);
    setEditMemberId(member._id);
    setName(member.name);
    setRole(member.role);
    setFile(null); // Reset file input
  };

  // ✅ Update team member
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name || !role) return alert("Name and Role cannot be empty!");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    if (file) formData.append("image", file); // Include file only if changed

    setLoading(true);
    try {
      await axios.put(`/team/${editMemberId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Reset form after update
      setEditMode(false);
      setEditMemberId(null);
      setName("");
      setRole("");
      setFile(null);
      document.getElementById("fileInput").value = "";

      fetchTeamMembers(); // Refresh team list
    } catch (error) {
      console.error("Failed to update team member", error);
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete team member
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      try {
        await axios.delete(`/team/${id}`);
        fetchTeamMembers();
      } catch (error) {
        console.error("Failed to delete team member", error);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Team Members</h1>

      {/* 📁 Upload / Edit Form */}
      <form onSubmit={editMode ? handleUpdate : handleUpload} className="mb-8">
        <input
          type="text"
          placeholder="Enter team member name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded mr-4"
          required
        />
        <input
          type="text"
          placeholder="Enter role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
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
          {loading ? (editMode ? "Updating..." : "Uploading...") : editMode ? "Update Member" : "Upload Member"}
        </button>
        
        {editMode && (
          <button
            type="button"
            onClick={() => {
              setEditMode(false);
              setEditMemberId(null);
              setName("");
              setRole("");
              setFile(null);
              document.getElementById("fileInput").value = "";
            }}
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      {/* 📋 Team Members Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-100">Photo</th>
              <th className="py-3 px-6 bg-gray-100">Name</th>
              <th className="py-3 px-6 bg-gray-100">Role</th>
              <th className="py-3 px-6 bg-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member) => (
              <tr key={member._id} className="border-b">
                <td className="py-3 px-6">
                  <img
                    src={member.imageUrl}
                    alt="team member"
                    className="w-32 h-20 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-6 text-center">{member.name}</td>
                <td className="py-3 px-6 text-center">{member.role}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleEdit(member)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(member._id)}
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

export default TeamMembers;
