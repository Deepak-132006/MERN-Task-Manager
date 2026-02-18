import React from "react";
import Logo from "../assets/Taskit-Logo-2-NoBG.png";
import Logout from "../assets/logout.png";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-[#e3e3e3] h-15">
      <div className="flex justify-between ">
        <div className="w-35 m-3 items-center flex -mt-10">
          <img src={Logo} alt="" />
        </div>
        <div
          className="max-w-6 m-6 cursor-pointer group flex flex-col items-center"
          onClick={handleLogout}
        >
          <img src={Logout} alt="logout icon" className="w-8 h-6 -mt-2" />
          <p className="mt-6 text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
