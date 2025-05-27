import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import Add_Agent from "./Pages/Add_Agent";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-agent" element={<Add_Agent />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
