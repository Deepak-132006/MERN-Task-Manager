import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import PixelCard from "../components/PixelCard";
import Logo from "../assets/Taskit-Logo-2-NoBG.png";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLogin = () => {
    navigate("/login");
  };

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

      toast.success("Signed up success!")
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Signup Failed!")
    }
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
            <img src={Logo} alt="Taskit" />
          </div>
          <h5 className=" font-semibold text-[#2C666E] mb-2">Create Account</h5>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-400 rounded-3xl p-2 pl-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2C666E]"
              placeholder="Enter your name"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-400 rounded-3xl p-2 pl-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2C666E]"
              placeholder="Enter your email"
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-400 rounded-3xl p-2 pl-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2C666E]"
              placeholder="Enter your password"
            />

            <button
              type="submit"
              className="bg-[#2C666E] hover:bg-[#235257] text-white rounded-3xl py-2 transition-colors duration-200"
            >
              Signup
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-2">
            Already have an account?{" "}
            <button
              onClick={handleLogin}
              className="text-[#2C666E] hover:underline font-medium"
            >
              Login
            </button>
          </p>
        </div>
      </PixelCard>
    </div>
  );
};

export default Signup;
