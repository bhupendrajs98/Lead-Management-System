import React, { useEffect, useState } from "react";
import { getLeads } from "../api/api";

const LeadDetails = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch leads
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await getLeads();

      const leadsArray = Array.isArray(data)
        ? data
        : data?.leads || [];

      setLeads(leadsArray);
    } catch (err) {
      setError("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  if (loading)
    return (
      <div className="p-6 text-gray-600">
        Loading leads...
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="bg-white p-5 rounded-xl shadow-md border mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Lead Details
        </h1>
        <p className="text-sm text-gray-500">
          All leads displayed in modern card layout
        </p>
      </div>

      {/* GRID CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {leads.map((lead) => (
          <div
            key={lead._id}
            className="bg-white rounded-2xl shadow-md border p-5 hover:shadow-xl transition duration-200"
          >

            {/* NAME + STATUS */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold text-gray-800">
                {lead.name}
              </h2>

              <span
                className={`px-3 py-1 text-xs rounded-full font-medium
                  ${
                    lead.status === "new"
                      ? "bg-blue-100 text-blue-600"
                      : lead.status === "contacted"
                      ? "bg-yellow-100 text-yellow-600"
                      : lead.status === "qualified"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
              >
                {lead.status}
              </span>
            </div>

            {/* DETAILS */}
            <div className="space-y-2 text-sm text-gray-600">

              <div className="flex justify-between">
                <span className="font-medium text-gray-500">Email:</span>
                <span>{lead.email}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-gray-500">Phone:</span>
                <span>{lead.phone}</span>
              </div>

              {lead.createdAt && (
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Date:</span>
                  <span>
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </span>
                </div>
              )}

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default LeadDetails;