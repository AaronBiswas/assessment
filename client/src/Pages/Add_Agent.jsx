import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import { isValidPhoneNumber } from "libphonenumber-js";
import axios from "axios";
import { toast } from "react-toastify";
import "react-international-phone/style.css";
import { useNavigate } from "react-router-dom";

const Add_Agent = () => {
  const navigate = useNavigate();
  const [phoneError, setPhoneError] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!isValidPhoneNumber(data.mobile)) {
        setPhoneError("Please enter a valid phone number with country code.");
        return;
      }
      const url = import.meta.env.VITE_APP_URL;
      const response = await axios.post(`${url}agent/new`, data, {
        withCredentials: true,
      });

      if (response.status === 201) {
        toast.success(`Agent creation successful!`);
        navigate("/");
      } else {
        toast.error("Agent creation failed");
        return;
      }

      console.log("Login data submitted:", data);
    } catch (e) {
      toast.error("Error in creating agent");
      console.error("Agent creation error", e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-900 bg-opacity-90 rounded-2xl shadow-2xl p-6 md:p-8 mx-3">
        <h1 className="text-2xl md:text-3xl font-extrabold text-center text-indigo-400 mb-6 md:mb-8 drop-shadow-lg">
          Add Agent
        </h1>
        <form className="gap-4" onSubmit={handleSubmit}>
          <div className="mb-5 md:mb-6">
            <label
              className="block text-gray-300 text-sm font-semibold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              className="shadow appearance-none border border-indigo-700/30 rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-200 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter name"
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5 md:mb-6">
            <label
              className="block text-gray-300 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="shadow appearance-none border border-indigo-700/30 rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-200 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5 md:mb-6">
            <label
              className="block text-gray-300 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="shadow appearance-none border border-indigo-700/30 rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-200 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6 md:mb-8">
            <label
              className="block text-gray-300 text-sm font-semibold mb-2"
              htmlFor="mobile"
            >
              Phone number
            </label>
            <PhoneInput
              name="mobile"
              value={data.mobile}
              onChange={(phone) => {
                setData({ ...data, mobile: phone });
                setPhoneError("");
              }}
              inputClassName="w-full px-3 py-2 bg-gray-800 text-white border border-indigo-700/30 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required={true}
            />
            {phoneError && (
              <p className="text-red-500 text-xs mt-1">{phoneError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 md:py-3 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Add Agent
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add_Agent;
