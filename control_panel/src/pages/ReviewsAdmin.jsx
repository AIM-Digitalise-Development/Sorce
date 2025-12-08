import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { FaTrash, FaEdit, FaStar } from "react-icons/fa"; // Added FaStar import

const ReviewsAdmin = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [designation, setDesignation] = useState("Happy Customer");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editReviewId, setEditReviewId] = useState(null);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get("/reviews");
      setReviews(data);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !review || !rating) {
      return alert("Please fill all required fields");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("review", review);
    formData.append("rating", rating);
    formData.append("designation", designation);
    if (file) formData.append("image", file);

    setLoading(true);
    try {
      const url = editMode ? `/reviews/${editReviewId}` : "/reviews";
      const method = editMode ? "put" : "post";
      
      await axios[method](url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      resetForm();
      fetchReviews();
    } catch (error) {
      console.error("Failed to save review", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (review) => {
    setEditMode(true);
    setEditReviewId(review._id);
    setName(review.name);
    setReview(review.review);
    setRating(review.rating);
    setDesignation(review.designation);
    setFile(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await axios.delete(`/reviews/${id}`);
        fetchReviews();
      } catch (error) {
        console.error("Failed to delete review", error);
      }
    }
  };

  const resetForm = () => {
    setEditMode(false);
    setEditReviewId(null);
    setName("");
    setReview("");
    setRating(5);
    setDesignation("Happy Customer");
    setFile(null);
    document.getElementById("fileInput").value = "";
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Reviews</h1>

      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">Name*</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Rating*</label>
            <select
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="border p-2 rounded w-full"
              required
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Star{num !== 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Designation</label>
          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Happy Customer"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Review*</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="border p-2 rounded w-full"
            rows="3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Image*</label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded w-full"
            required={!editMode}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded ${editMode ? "bg-green-600" : "bg-blue-600"} text-white`}
          >
            {loading ? (editMode ? "Updating..." : "Creating...") : editMode ? "Update Review" : "Create Review"}
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

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-100">Image</th>
              <th className="py-3 px-6 bg-gray-100">Name</th>
              <th className="py-3 px-6 bg-gray-100">Review</th>
              <th className="py-3 px-6 bg-gray-100">Rating</th>
              <th className="py-3 px-6 bg-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="border-b">
                <td className="py-3 px-6">
                  <img
                    src={review.imageUrl}
                    alt={review.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </td>
                <td className="py-3 px-6">{review.name}</td>
                <td className="py-3 px-6 max-w-xs truncate">{review.review}</td>
                <td className="py-3 px-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-600' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => handleEdit(review)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
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

export default ReviewsAdmin;