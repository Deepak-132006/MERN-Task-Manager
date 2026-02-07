import React, { useState } from "react";
import api from "../api/axios";
import { Navigate, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/signup", form);
      console.log("Signup Success", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      alert("Signup Success!!");
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Name:
        <input type="text" name="name" value={form.name} onChange={handleChange} required/>
        <br />
        Email:
        <input type="email" name="email" value={form.email} onChange={handleChange} required/>
        <br />
        Password:
        <input type="password" name="password" value={form.password} onChange={handleChange} required/>
        <br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
