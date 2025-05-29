import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [loginData, setloginData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginData({ ...loginData, [name]: value });
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const url = import.meta.env.VITE_APP_URL;
      const response = await axios.post(`${url}admin/login`, loginData, { withCredentials: true });

      if (response.status === 200) {
        toast.success(`Login successful!`);
        setLoggedIn(true)
        navigate("/");
      } else {
        toast.error("Login failed. Please check your credentials.");
        return;
      }
    } catch (e) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", e);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-900 bg-opacity-90 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-indigo-400 mb-8 drop-shadow-lg">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
              className="shadow appearance-none border border-indigo-700/30 rounded w-full py-3 px-4 text-gray-200 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              className="shadow appearance-none border border-indigo-700/30 rounded w-full py-3 px-4 text-gray-200 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login