import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium
    ${
      isActive
        ? "bg-white text-blue-600 font-semibold"
        : "text-white hover:bg-blue-400"
    }`;

  return (
    <div className="h-screen w-64 bg-gray-800 flex flex-col shadow-lg">
      {/* Logo */}
      <div className="p-6 border-b border-blue-400">
        <h1 className="text-2xl font-bold text-white">
          CRM Panel
        </h1>
        <p className="text-xs text-blue-100">
          Lead Management System
        </p>
      </div>

      {/* Menu */}
      <div className="flex-1 p-4 flex flex-col gap-2">

        <NavLink to="/dashboard" className={linkClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/leads" className={linkClass}>
          <Users size={20} />
          Lead Listing
        </NavLink>

        <NavLink to="/lead-details" className={linkClass}>
          <FileText size={20} />
          Lead Details
        </NavLink>

      </div>

      {/* Logout */}
      <div className="p-4 border-t border-blue-400">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white hover:bg-red-500 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </div>
  );
};

export default Sidebar;