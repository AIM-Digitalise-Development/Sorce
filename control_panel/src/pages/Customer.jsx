import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import { FaTrash } from "react-icons/fa";

const Customer = () => {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    try {
      const { data } = await axios.get("/customers");
      setLeads(data);
    } catch (error) {
      console.error("Failed to fetch leads", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await axios.delete(`/customers/${id}`);
        fetchLeads();
      } catch (error) {
        console.error("Failed to delete lead", error);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Leads</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-100">Name</th>
              <th className="py-3 px-6 bg-gray-100">Email</th>
              <th className="py-3 px-6 bg-gray-100">Phone</th>
              <th className="py-3 px-6 bg-gray-100">Message</th>
              <th className="py-3 px-6 bg-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="border-b">
                <td className="py-3 px-6 text-center">{lead.name}</td>
                <td className="py-3 px-6 text-center">{lead.email}</td>
                <td className="py-3 px-6 text-center">{lead.phone}</td>
                <td className="py-3 px-6 text-center">{lead.message}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleDelete(lead._id)}
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

export default Customer;