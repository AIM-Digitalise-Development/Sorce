import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-lg">
      <div className="container mx-auto flex justify-end items-center">
        {token && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 px-5 py-2 rounded-full text-white font-medium shadow-md hover:bg-red-700 transition duration-300"
          >
            <FaSignOutAlt className="text-lg" /> Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
