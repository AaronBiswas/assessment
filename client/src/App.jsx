import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import Add_Agent from "./Pages/Add_Agent";
import { useState } from "react";
import Upload from "./Pages/Upload";

const App = () => {
  const[loggedIn,setLoggedIn]=useState(false)
  return (
    <div>
      <Navbar loggedIn={loggedIn} />
      <Routes>
        <Route path="/" element={<Home loggedIn={loggedIn} />}  />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />}  />
        <Route path="/add-agent" element={<Add_Agent />} />
        <Route path="/file/upload" element={<Upload />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
