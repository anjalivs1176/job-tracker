
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuthContext } from "../context/AuthContext";

// const Navbar = () => {
//   const { user, logout } = useAuthContext();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();       // clear auth context and localStorage
//     navigate("/login"); // redirect to login page
//   };

//   return (
//     <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
//       <div className="text-xl font-bold">
//         <Link to="/">Job Tracker</Link>
//       </div>
//       {user && (
//         <div className="flex gap-4 items-center">
//           <Link to="/add" className="hover:underline">
//             Add Job
//           </Link>
//           <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
//             Logout
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


















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
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 shadow-lg flex justify-between items-center">
      <div className="text-2xl font-bold tracking-wide">
        <Link to="/">Job Tracker</Link>
      </div>
      {user && (
        <div className="flex gap-6 items-center">
          <Link to="/add" className="hover:underline text-lg">
            ➕ Add Job
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;



