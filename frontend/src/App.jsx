import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import JobList from "./components/JobList";
import AddJob from "./pages/AddJob";
import EditJob from './pages/EditJob';
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute><JobList /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><AddJob /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditJob /></PrivateRoute>} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />


      </Routes>
    </Router>
  );
};

export default App;
