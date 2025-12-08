import React, { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { FaLock, FaKey } from "react-icons/fa";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/admin/change-password", {
        email: localStorage.getItem("adminEmail"),
        oldPassword,
        newPassword,
      });

      // ✅ Remove old tokens and store new ones
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      setSuccess("Password changed successfully! Please log in again.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Password change failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 flex items-center justify-center">
          <FaKey className="mr-2 text-indigo-600" /> Change Password
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Old Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none pl-10"
                required
              />
              <FaLock className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none pl-10"
                required
              />
              <FaKey className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-2 mt-2 text-white font-medium rounded-md transition-all ${
              oldPassword && newPassword
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!oldPassword || !newPassword || loading}
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
