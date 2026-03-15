import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import PixelCard from "../components/PixelCard";
import Logo from "../assets/Taskit-Logo-2-NoBG.png";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await api.post("/auth/login", form);
      console.log("Login Success!!", response.data);
      toast.success("Logged in Successfully")

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      login();
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data || response.message);
      alert(error.response?.data || "Login failed");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-100">
      <PixelCard
        variant="default"
        colors="#d1d5db,#94a3b8,#2C666E"
        speed={40}
        gap={5}
        className="h-[420px] w-[350px] shadow-lg"
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center gap-6 p-8">
          <div className="w-1/2">
            <img src={Logo} alt="taskit" />
          </div>
          <h5 className=" font-semibold text-[#2C666E] mb-2">
            Login to the Account
          </h5>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-400 rounded-3xl p-2 pl-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2C666E]"
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-400 rounded-3xl p-2 pl-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2C666E]"
            />
            <button
              type="submit"
              className="bg-[#2C666E] hover:bg-[#235257] text-white rounded-3xl py-2 transition-colors duration-200"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-2">
            Don't have an account?{" "}
            <button
              onClick={handleSignup}
              className="text-[#2C666E] hover:underline font-medium"
            >
              Signup
            </button>
          </p>
        </div>
      </PixelCard>
    </div>
  );
};

export default Login;
