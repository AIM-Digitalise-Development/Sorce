import React from "react";

const blogs = [
  {
    title: "Rabindra Jayanti",
    image: "/assets/blog1.jpg",
    date: "May 9, 2024",
    description: "Celebrating the birth anniversary of Rabindranath Tagore with cultural programs and poetry recitations.",
  },
  {
    title: "Holi Utsav",
    image: "/assets/blog2.jpg",
    date: "March 25, 2024",
    description: "A festival of colors, joy, and togetherness, celebrated with enthusiasm and traditional rituals.",
  },
  {
    title: "Invitation Card",
    image: "/assets/blog3.jpg",
    date: "February 14, 2024",
    description: "Sending warm invitations for an upcoming event, beautifully crafted with creative designs.",
  },
];

const BlogSection = () => {
  return (
    <div className="bg-gray-900 py-20 px-8 lg:px-16 text-center">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-white mb-4">Latest Blog Updates</h2>
      <p className="text-lg text-white mb-12">Stay updated with our latest news and events</p>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            {/* Blog Image */}
            <img src={blog.image} alt={blog.title} className="w-full h-60 object-cover" />

            {/* Blog Content */}
            <div className="p-6 text-left">
              <p className="text-sm text-gray-500">{blog.date}</p>
              <h3 className="text-2xl font-semibold text-gray-900 mt-2">{blog.title}</h3>
              <p className="text-gray-700 mt-2">{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
