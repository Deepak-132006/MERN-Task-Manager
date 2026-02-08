import React from "react";
import Logo from "../assets/Taskit-Logo-2.png";
import Logout from "../assets/logout.png";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    localStorage.removeItem('token');
    navigate("/login")
  }

  return (
    <div className="">
      <div className="flex justify-between">
        <div className="w-35 m-3">
          <img src={Logo} alt="" />
        </div>
        <div className="max-w-6 m-6" onClick={handleLogout}>
            <img src={Logout} alt="" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
