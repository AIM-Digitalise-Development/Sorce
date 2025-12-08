import React, { useState } from "react";

const BannerForm = ({ onSubmit }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile)); // Preview image or video
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("banner", file);
    onSubmit(formData);
    setFile(null);
    setPreviewUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        required
        className="block w-full text-sm text-gray-500"
      />
      {previewUrl &&
        (file?.type?.startsWith("video") ? (
          <video width="400" controls>
            <source src={previewUrl} type={file.type} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={previewUrl} alt="Preview" className="w-64 h-40 object-cover" />
        ))}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Upload Banner
      </button>
    </form>
  );
};

export default BannerForm;
