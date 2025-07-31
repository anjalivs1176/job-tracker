import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import JobList from "./components/JobList"; 
import AddJob from "./pages/AddJob";
import EditJob from './pages/EditJob'; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/add" element={<AddJob />} />
        <Route path="/edit/:id" element={<EditJob />} />
      </Routes>
    </Router>
  );
};

export default App;
