import React, { useEffect, useState } from "react";
import { getLeads } from "../api/api";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (error) {
      console.log("Error fetching leads:", error);
    }
  };

  // Lead Calculations
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const contactedLeads = leads.filter(
    (l) => l.status === "Contacted"
  ).length;
  const qualifiedLeads = leads.filter(
    (l) => l.status === "Qualified"
  ).length;
  const lostLeads = leads.filter((l) => l.status === "Lost").length;

  // Chart Data
  const pieData = [
    { name: "New", value: newLeads },
    { name: "Contacted", value: contactedLeads },
    { name: "Qualified", value: qualifiedLeads },
    { name: "Lost", value: lostLeads },
  ];

  const barData = pieData;

  const COLORS = ["#3b82f6", "#facc15", "#22c55e", "#ef4444"];

  // Insights
  const conversionRate = totalLeads
    ? ((qualifiedLeads / totalLeads) * 100).toFixed(1)
    : 0;

  const dropRate = totalLeads
    ? ((lostLeads / totalLeads) * 100).toFixed(1)
    : 0;

  const activeLeads =
    newLeads + contactedLeads + qualifiedLeads;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6">
        📊 CRM Dashboard
      </h1>

      {/* ================= STATS CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">

        <Card title="Total Leads" value={totalLeads} />

        <ColorCard
          title="New"
          value={newLeads}
          bg="bg-blue-100"
          text="text-blue-600"
        />

        <ColorCard
          title="Contacted"
          value={contactedLeads}
          bg="bg-yellow-100"
          text="text-yellow-600"
        />

        <ColorCard
          title="Qualified"
          value={qualifiedLeads}
          bg="bg-green-100"
          text="text-green-600"
        />

        <ColorCard
          title="Lost"
          value={lostLeads}
          bg="bg-red-100"
          text="text-red-600"
        />

      </div>

      {/* ================= CHARTS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* PIE CHART */}

        <div className="bg-white p-4 shadow rounded-xl">
          <h2 className="text-lg font-semibold mb-4">
            Lead Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}

        <div className="bg-white p-4 shadow rounded-xl">
          <h2 className="text-lg font-semibold mb-4">
            Lead Status Overview
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="value"
                fill="#3b82f6"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ================= BOTTOM SECTION ================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        {/* RECENT LEADS TABLE */}

        <div className="md:col-span-2 bg-white p-4 shadow rounded-xl">

          <h2 className="text-lg font-semibold mb-4">
            🆕 Recent Leads
          </h2>

          {leads.length === 0 ? (
            <p className="text-gray-500">
              No leads available
            </p>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead>

                  <tr className="border-b">

                    <th className="py-2">Name</th>
                    <th>Email</th>
                    <th>Status</th>

                  </tr>

                </thead>

                <tbody>

                  {leads.slice(0, 5).map((lead) => (

                    <tr
                      key={lead._id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="py-2">
                        {lead.name}
                      </td>

                      <td>{lead.email}</td>

                      <td>

                        <span className="px-2 py-1 text-sm bg-gray-100 rounded">

                          {lead.status}

                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}
        </div>

        {/* INSIGHTS PANEL */}

        <div className="bg-white p-4 shadow rounded-xl">

          <h2 className="text-lg font-semibold mb-4">
            📊 Insights
          </h2>

          <div className="space-y-4">

            <InsightCard
              label="Conversion Rate"
              value={`${conversionRate}%`}
              bg="bg-blue-50"
            />

            <InsightCard
              label="Active Leads"
              value={activeLeads}
              bg="bg-green-50"
            />

            <InsightCard
              label="Drop Rate"
              value={`${dropRate}%`}
              bg="bg-red-50"
            />

          </div>

        </div>

      </div>

    </div>
  );
};

/* ================= SMALL UI COMPONENTS ================= */

const Card = ({ title, value }) => (
  <div className="bg-white shadow rounded-xl p-4">
    <h2 className="text-gray-500">{title}</h2>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const ColorCard = ({ title, value, bg, text }) => (
  <div className={`${bg} shadow rounded-xl p-4`}>
    <h2 className={text}>{title}</h2>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const InsightCard = ({ label, value, bg }) => (
  <div className={`${bg} p-3 rounded-lg`}>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default Dashboard;