import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import Add_Agent from "./Pages/Add_Agent";
import { useEffect, useState } from "react";
import Upload from "./Pages/Upload";
import axios from "axios";
import Signup from "./Pages/Signup";

const App = () => {
  const[loggedIn,setLoggedIn]=useState(false)
  
  useEffect(()=>{
    const verifyUser = async() =>{
      const url = import.meta.env.VITE_APP_URL;
        const response = await axios.post(`${url}admin/auth`,{}, {
          withCredentials: true,
        });
        if(response.data.user)
          setLoggedIn(true)
        else
          setLoggedIn(false)
    }
    verifyUser();
  },[]);

  return (
    <div>
      <Navbar loggedIn={loggedIn} />
      <Routes>
        <Route path="/" element={<Home loggedIn={loggedIn}/>}  />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />}  />
         <Route path="/admin/create" element={<Signup />} />
        <Route path="/add-agent" element={<Add_Agent />} />
        <Route path="/file/upload" element={<Upload/>} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
