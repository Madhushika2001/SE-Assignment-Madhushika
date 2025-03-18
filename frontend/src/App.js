import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddEditStudent from "./pages/AddEditStudent";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-student" element={<AddEditStudent />} />
              <Route path="/edit-student/:id" element={<AddEditStudent />} />
            </Routes>
            <Footer/>
          </>
        }/>
      </Routes>
    </Router>
  );
}

export default App;