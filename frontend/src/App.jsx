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
    <div className="flex">

      {/* Sidebar only if logged in AND not login page */}
      {token && !hideSidebar && <Sidebar />}

      <div className="flex-1">

        <Routes>

          {/* Login */}
          <Route
            path="/login"
            element={<Login />}
          />

           <Route
            path="/signup"
            element={<Signup />}
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login || /signup" />}
          />

          {/* Default */}
          <Route
            path="/"
            element={<Navigate to={token ? "/dashboard" : "/login"} />}
          />
          <Route path="/leads" element={<LeadListing/>}/>
          <Route path="/lead-details" element={<LeadDetails/>}/>z``
        </Routes>

      </div>
    </div>
  );
}

export default App;