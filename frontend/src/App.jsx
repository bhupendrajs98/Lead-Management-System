import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import LeadListing from "./components/LeadListing";
import LeadDetails from "./components/LeadDetails";
import Signup from "./components/Signup";

function App() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // login page pe sidebar hide
  const hideSidebar = location.pathname === "/login";

  return (
    <div>

      {/* Sidebar fixed */}
      {token && !hideSidebar && (
        <div className="fixed left-0 top-0 h-screen w-64">
          <Sidebar />
        </div>
      )}

      {/* Main Content */}
      <div className={`${token && !hideSidebar ? "ml-64" : ""}`}>
        <Routes>

          {/* Login */}
          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />

          {/* Default */}
          <Route
            path="/"
            element={<Navigate to={token ? "/dashboard" : "/login"} />}
          />

          <Route path="/leads" element={<LeadListing />} />
          <Route path="/lead-details" element={<LeadDetails />} />

        </Routes>
      </div>

    </div>
  );
}

export default App;