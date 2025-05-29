import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = ({ loggedIn }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const url = import.meta.env.VITE_APP_URL;
      const response = await axios.post(
        `${url}admin/logout`,
        {},
        { withCredentials: true }
      );

      if (response.status == 200) {
        toast.success("Logout successful!");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        toast.error("Error in logging out!");
      }
    } catch (error) {
      console.error("Logout error", error);
    }
  };
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-lg font-bold">
          MyApp
        </a>
        {loggedIn ? (
          <button
            onClick={handleLogout}
            className="text-gray-300 hover:text-white px-3 py-2 bg-transparent border-none cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="text-gray-300 hover:text-white px-3 py-2 bg-transparent border-none cursor-pointer"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
