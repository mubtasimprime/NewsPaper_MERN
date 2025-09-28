import { Outlet } from "react-router";
import DashboardSidebar from "../components/DashboardSidebar";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${import.meta.env.VITE_API_URL}/user-role?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setUserRole(data.role));
  }, [user?.email]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 hidden md:block">
        <div className="text-2xl font-bold mb-10 text-center text-blue-600">
          DashBoard
        </div>
        <DashboardSidebar userRole={userRole} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
