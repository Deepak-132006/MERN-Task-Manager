import React from "react";
import Logo from "../assets/Taskit-Logo-2-NoBG.png";
import Logout from "../assets/logout.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    localStorage.removeItem("token");
    toast.warning("Logged out Successfully")
    navigate("/login");
  };

  return (
    <div className="bg-[#e3e3e3] h-18  items-center">
      <div className="flex justify-between ">
        <div className="w-35 md:w-45 m-3 items-center flex -mt-6 md:-mt-10 hover:scale-101 transition">
          <img src={Logo} alt="Logout" />
        </div>
        <div
          className="max-w-6 m-6 cursor-pointer group flex flex-col items-center hover:scale-105 transition"
          onClick={handleLogout}
        >
          <img src={Logout} alt="logout icon" className="w-24 h-6 -mt-" />
          <p className="mt-2 md:mt-6 bg-[#ffff] px-2 py-1 rounded text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
