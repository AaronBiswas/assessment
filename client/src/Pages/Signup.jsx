import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Signup = () => {
  const navigate = useNavigate()
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setSignupData({ ...signupData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = import.meta.env.VITE_APP_URL
      const response = await axios.post(`${url}admin/create`, signupData, { withCredentials: true })

      if (response.status === 201) {
        toast.success("Signup successful! Please login.")
        navigate("/login")
      } else {
        toast.error(response.data?.message || "Signup failed. Please try again.")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed. Please try again.")
      console.error("Signup error:", error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-900 bg-opacity-90 rounded-2xl shadow-2xl p-6 md:p-8 mx-3">
        <h1 className="text-2xl md:text-3xl font-extrabold text-center text-indigo-400 mb-6 md:mb-8 drop-shadow-lg">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5 md:mb-6">
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={signupData.name}
              className="shadow appearance-none border border-indigo-700/30 rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-200 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>
          <div className="mb-5 md:mb-6">
            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={signupData.email}
              className="shadow appearance-none border border-indigo-700/30 rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-200 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={handleChange}
              autoComplete="username"
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
              value={signupData.password}
              className="shadow appearance-none border border-indigo-700/30 rounded w-full py-2 md:py-3 px-3 md:px-4 text-gray-200 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 md:py-3 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup