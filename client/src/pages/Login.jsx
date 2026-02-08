import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await api.post("/auth/login", form);
      console.log("Login Success!!", response.data);
      alert("Login Success!!")


      if(response.data.token){
        localStorage.setItem("token", response.data.token)
      }

      navigate("/dashboard")
    } catch (error) {
      console.error(error.response?.data || response.message);
      alert(error.response?.data || "Login failed");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        Email:{" "}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        /> <br />
        Password:{" "}
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        /> <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
