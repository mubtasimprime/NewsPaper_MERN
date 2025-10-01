import { Outlet } from "react-router";
import DashboardSidebar from "../components/DashboardSidebar";
import { useEffect, useState, useRef } from "react";
import useAuth from "../hooks/useAuth";
import { FaBars, FaTimes } from "react-icons/fa";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef();

  // Fetch user role
  useEffect(() => {
    if (!user?.email) return;
    fetch(`${import.meta.env.VITE_API_URL}/user-role?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setUserRole(data.role));
  }, [user?.email]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };
    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div className="flex bg-gray-100 relative">
      {/* Hamburger / Close button for small screens */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-white shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <FaTimes className="text-2xl" />
        ) : (
          <FaBars className="text-2xl" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 min-h-screen w-64 bg-white shadow-md p-5 transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:relative md:translate-x-0 md:block z-40`}
      >
        <div className="text-2xl font-bold mb-10 text-center">DashBoard</div>
        <DashboardSidebar
          userRole={userRole}
          onLinkClick={() => setSidebarOpen(false)}
        />
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 md:p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
