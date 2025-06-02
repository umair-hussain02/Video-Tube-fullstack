import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice"; // adjust path if needed
import { toast } from "react-toastify";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { useState } from "react";
import { toggleSidebar } from "../features/sidebar/sidebarSlice";
import { AlignJustify, AlignLeft } from "lucide-react";

const Header = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);

  // const user = JSON.parse(localStorage.getItem("User"));

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black text-white drop-shadow-[0_4px_4px_rgba(255,255,255,0.15)]">
      <div className=" mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div className="flex items-center ml-2  py-2">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="text-white text-xl mr-4  hover:bg-gray-900 p-3 rounded-full"
          >
            {isCollapsed ? <AlignLeft /> : <AlignJustify />}
          </button>
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="w-[70px]" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-4 max-w-md">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full px-4 py-2 rounded-lg border text-white bg-black border-gray-300 focus:outline-none focus:border-white-500 text-sm"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-2 mr-2">
          {user ? (
            <>
              <Link to={`/c/${user.userName}`}>
                <img
                  src={user.avatar}
                  alt=" "
                  className="w-10 h-10 rounded-full mr-4"
                />
              </Link>
              <Link
                to="/upload-video"
                className="bg-[#AE7AFF] text-white py-2 px-5  rounded-lg hover:bg-[#7b54b9] transition duration-300"
              >
                <MdOutlineDriveFolderUpload size={20} />
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-white-600 hover:bg-gray-500 px-4 py-2 rounded-lg transition duration-300"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
