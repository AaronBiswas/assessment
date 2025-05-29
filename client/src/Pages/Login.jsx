import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = ({setLoggedIn}) => {
  const navigate= useNavigate();
    const [loginData,setloginData]=useState({
    email: "",
    password: ""
    })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginData({ ...loginData, [name]: value });
  }

  const handleSubmit =async (e) => {
    try {
      e.preventDefault();
      const url= import.meta.env.VITE_APP_URL;
      console.log(url);
      const response= await axios.post(`${url}admin/login`, loginData, { withCredentials: true });

      if (response.status === 200) {
        toast.success(`Login successful!`);
        setLoggedIn(true)
        navigate("/");
      }
      else{
        toast.error("Login failed. Please check your credentials.");
        return;
      }

    console.log("Login data submitted:", loginData);
    } catch (e) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", e);
    }
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-center mt-10">Login Page</h1>
        <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login