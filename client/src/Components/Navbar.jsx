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
    <nav className="bg-gray-900 bg-opacity-90 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" className="text-indigo-400 text-2xl font-extrabold tracking-wide drop-shadow">
          CSTech
        </a>
        <div>
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;