// components/BannerTable.jsx
import React from "react";

const BannerTable = ({ banners, onDelete, onEdit }) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-4">Banner List</h2>
      {banners.length === 0 ? (
        <p>No banners added yet.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner, index) => (
              <tr key={banner.id}>
                <td className="p-2 border text-center">{index + 1}</td>
                <td className="p-2 border text-center">
                  <img
                    src={banner.image}
                    alt="Banner"
                    className="h-24 mx-auto object-cover"
                  />
                </td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => onEdit(banner)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(banner.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BannerTable;
