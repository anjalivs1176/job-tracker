import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-6 py-4 shadow-lg flex flex-wrap justify-between items-center w-full overflow-x-hidden">
      <div className="text-xl sm:text-2xl font-bold tracking-wide">
        <Link to="/">Job Tracker</Link>
      </div>

      {user && (
        <div className="flex flex-wrap gap-4 items-center mt-3 sm:mt-0">
          <Link
            to="/add"
            className="hover:underline text-base sm:text-lg whitespace-nowrap"
          >
            ➕ Add Job
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded text-white transition text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
