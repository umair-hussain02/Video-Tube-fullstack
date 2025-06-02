import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Layout() {
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div
          className={`${
            isCollapsed ? "w-16" : "w-56"
          }  text-white fixed h-full z-10 transition-all duration-300 `}
        >
          <Sidebar />
        </div>

        {/* Main content */}
        <div
          className={`transition-all duration-300 w-full p-4 pt-24 ${
            isCollapsed ? "ml-16" : "ml-64"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}
