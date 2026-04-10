import axios from "axios";

// ---------------- BASE INSTANCE ----------------
const API = axios.create({
  baseURL: "http://localhost:9996/api",
});

// ---------------- TOKEN INTERCEPTOR ----------------
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("TOKEN IN INTERCEPTOR:", token); 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ---------------- AUTH APIs ----------------

// Register user
export const registerUser = async (userData) => {
  try {
    const res = await API.post("/auth/register", userData);
    return res.data;
  } catch (error) {
    console.log("REGISTER ERROR:", error.response?.data || error.message);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const res = await API.post("/auth/login", credentials);

    // IMPORTANT: store token
    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  } catch (error) {
    console.log("LOGIN ERROR:", error.response?.data || error.message);
    throw error;
  }
};

// ---------------- LEAD APIs ----------------

// Get all leads
export const getLeads = async () => {
  try {
    const res = await API.get("/leads");
    return res.data;
  } catch (error) {
    console.log("GET LEADS ERROR:", error.response?.data || error.message);
    throw error;
  }
};

// Get single lead
export const getLeadById = async (id) => {
  try {
    const res = await API.get(`/leads/${id}`);
    return res.data;
  } catch (error) {
    console.log("GET LEAD ERROR:", error.response?.data || error.message);
    throw error;
  }
};

// CREATE LEAD 
export const createLead = async (leadData) => {
  try {
    console.log("SENDING LEAD DATA:", leadData);

    const res = await API.post("/leads", leadData);

    return res.data;
  } catch (error) {
    console.log("CREATE LEAD ERROR:", error.response?.data || error.message);
    throw error;
  }
};

// Update lead
export const updateLead = async (id, leadData) => {
  try {
    const res = await API.put(`/leads/${id}`, leadData);
    return res.data;
  } catch (error) {
    console.log("UPDATE ERROR:", error.response?.data || error.message);
    throw error;
  }
};

// Delete lead
export const deleteLead = async (id) => {
  try {
    const res = await API.delete(`/leads/${id}`);
    return res.data;
  } catch (error) {
    console.log("DELETE ERROR:", error.response?.data || error.message);
    throw error;
  }
};