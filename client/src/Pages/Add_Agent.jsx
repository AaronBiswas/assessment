import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import axios from "axios";
import { toast } from "react-toastify";
import "react-international-phone/style.css";
import { useNavigate } from "react-router-dom";

const Add_Agent = () => {
  const navigate = useNavigate();

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
    <div>
      <div>
        <form className="gap-4" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold text-center mt-10">Add Agent</h1>
          <div className="max-w-md mx-auto mt-8 p-6 bg-gray-900 shadow-md rounded-lg">
            <label className="block mb-4">
              <span className="text-white">Name</span>
              <input
                type="text"
                name="name"
                className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter name"
                value={data.name}
                onChange={handleChange}
              />
            </label>
            <label className="block mb-4">
              <span className="text-white">Email</span>
              <input
                type="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter email"
                value={data.email}
                onChange={handleChange}
              />
            </label>
            <label className="block mb-4">
              <span className="text-white">Password</span>
              <input
                type="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter password"
                value={data.password}
                onChange={handleChange}
              />
            </label>
            <label className="block mb-4">
              <span className="text-white">Phone number</span>
              <PhoneInput
                defaultCountry="us"
                name="mobile"
                value={data.mobile}
                onChange={(phone) => setData({ ...data, mobile: phone })}
                inputClassName="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
              />
            </label>
            <button
              type="submit"
              className="w-full px-6 py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
            >
              Add Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add_Agent;
