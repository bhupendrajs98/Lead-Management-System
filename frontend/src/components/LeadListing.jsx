import React, { useEffect, useState } from "react";
import { getLeads, createLead, updateLead, deleteLead } from "../api/api";

const LeadListing = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "new",
  });

  // 👤 Logged-in user name (localStorage se)
  const username = localStorage.getItem("userName") || "User";

  // Fetch leads
  const fetchLeads = async () => {
    try {
      setLoading(true);

      const data = await getLeads();

      const leadsArray = Array.isArray(data)
        ? data
        : data?.leads || [];

      setLeads(leadsArray);
      setFilteredLeads(leadsArray);
    } catch (err) {
      setError("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  //  Search logic
  useEffect(() => {
    const filtered = leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredLeads(filtered);
  }, [searchTerm, leads]);

  // Open Add Modal
  const openAddModal = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      status: "new",
    });

    setEditId(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (lead) => {
    setFormData(lead);
    setEditId(lead._id);
    setIsModalOpen(true);
  };

  // Handle change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await updateLead(editId, formData);
      } else {
        await createLead(formData);
      }

      setIsModalOpen(false);
      fetchLeads();
    } catch (err) {
      alert("Something went wrong");
    }
  };

  // Delete lead
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this lead?");
    if (!confirmDelete) return;

    try {
      await deleteLead(id);

      setLeads((prev) =>
        prev.filter((l) => l._id !== id)
      );
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

    

      {/* HEADER CARD */}
      <div className="flex flex-col md:flex-row justify-between gap-3 items-center mb-6 bg-white p-4 rounded-xl shadow-md border">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Lead Listing
          </h1>

          <p className="text-sm text-gray-500">
            Manage all your leads easily
          </p>
        </div>

        {/* SEARCH BAR */}

        <input
          type="text"
          placeholder="Search by name or email..."
          className="border px-4 py-2 rounded-lg w-full md:w-72 focus:ring-2 focus:ring-green-400"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <button
          onClick={openAddModal}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          + Add Lead
        </button>

      </div>

      {/* TABLE CARD */}

      <div className="bg-white rounded-xl shadow-md border overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100 text-gray-600 text-sm">

            <tr>

              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredLeads.map((lead) => (

              <tr
                key={lead._id}
                className="border-t hover:bg-gray-50 transition"
              >

                <td className="p-3 font-medium">
                  {lead.name}
                </td>

                <td className="p-3 text-gray-600">
                  {lead.email}
                </td>

                <td className="p-3 text-gray-600">
                  {lead.phone}
                </td>

                <td className="p-3">

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

                </td>

                <td className="p-3">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() =>
                        openEditModal(lead)
                      }
                      className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(lead._id)
                      }
                      className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* MODAL SAME AS BEFORE */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">

          <div className="bg-white rounded-2xl shadow-2xl w-96 p-6">

            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {editId ? "Edit Lead" : "Add Lead"}
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border rounded-lg p-2 mb-3"
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border rounded-lg p-2 mb-3"
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border rounded-lg p-2 mb-3"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 mb-4"
              >

                <option value="new">New</option>
                <option value="contacted">
                  Contacted
                </option>
                <option value="qualified">
                  Qualified
                </option>
                <option value="lost">Lost</option>

              </select>

              <div className="flex justify-between">

                <button
                  type="button"
                  onClick={() =>
                    setIsModalOpen(false)
                  }
                  className="bg-gray-200 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  {editId ? "Update" : "Create"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default LeadListing;