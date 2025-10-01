import { Outlet } from "react-router";
import DashboardSidebar from "../components/DashboardSidebar";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { FaBars } from "react-icons/fa";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${import.meta.env.VITE_API_URL}/user-role?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setUserRole(data.role));
  }, [user?.email]);

  // Function to close sidebar (to pass to links)
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md p-5 transform 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 transition-transform duration-300 z-50`}
      >
        {/* Header stays static, no click */}
        <div className="text-2xl font-bold mb-10 text-center">DashBoard</div>

        <DashboardSidebar userRole={userRole} closeSidebar={closeSidebar} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        {/* Hamburger menu button - only on mobile */}
        <button
          className="md:hidden mb-4 text-2xl"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
