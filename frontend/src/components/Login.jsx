import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const data = await loginUser(formData);
      console.log(data); 

      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user.name);

      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 2000);

    } catch (err) {
      setLoading(false);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">

      {/* CARD */}
      <div className="w-96 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 text-white">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center mb-1">
          Welcome Back 
        </h2>

        <p className="text-center text-sm text-gray-300 mb-6">
          Login to your CRM dashboard
        </p>

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/20 text-red-300 text-sm p-2 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`p-3 rounded-lg font-semibold transition shadow-lg ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* SIGNUP LINK */}
        <p className="text-sm text-center mt-6 text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Create a new account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;