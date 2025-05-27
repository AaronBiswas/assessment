import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate= useNavigate();
  return (
    <div>
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
            <a href="/" className="text-white text-lg font-bold">MyApp</a>
            <div>
                <a onClick={()=>navigate("/login")} className="text-gray-300 hover:text-white px-3 py-2">Login</a>
            </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar