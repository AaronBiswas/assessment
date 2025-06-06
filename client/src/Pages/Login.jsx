import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const url = import.meta.env.VITE_APP_URL;
      const response = await axios.post(`${url}admin/login`, loginData, { 
        withCredentials: true 
      });

      if (response.status === 200) {
        toast.success('Login successful!');
        
        if (setLoggedIn) {
          setLoggedIn(true);
        }
        
        // Small delay to ensure state is updated
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 100);
        
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      if (error.response?.status === 401) {
        toast.error("Invalid email or password.");
      } else if (error.response?.status >= 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-900 bg-opacity-90 rounded-2xl shadow-2xl p-6 md:p-8 mx-3">
        <h1 className="text-2xl md:text-3xl font-extrabold text-center text-indigo-400 mb-6 md:mb-8 drop-shadow-lg">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5 md:mb-6">
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
              className="shadow appearance-none border border-indigo-700/30 rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-200 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={handleChange}
              autoComplete="username"
              disabled={isLoading}
              required
            />
          </div>
          <div className="mb-6 md:mb-8">
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              className="shadow appearance-none border border-indigo-700/30 rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-200 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={handleChange}
              autoComplete="current-password"
              disabled={isLoading}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 md:py-3 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;