import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/api";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await registerUser(formData);

      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 2000);

    } catch (err) {
      setLoading(false);

      setError(
        err?.response?.data?.message || "Signup failed. Try again."
      );

      console.log("SIGNUP ERROR:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-600 to-blue-600">

      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96 border border-white/20">

        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Create Account
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Start managing your leads today
        </p>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center bg-red-50 p-2 rounded-lg">
            {error}
          </p>
        )}

        {/* LOADING */}
        {loading && (
          <p className="text-blue-600 text-sm mb-3 text-center animate-pulse">
            Creating account...
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* USERNAME */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`p-3 rounded-lg font-semibold text-white transition shadow-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-90"
            }`}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>

        </form>

        {/* LOGIN LINK */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;