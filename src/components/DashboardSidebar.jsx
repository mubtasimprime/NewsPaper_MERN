import { NavLink } from "react-router";
import useRole from "../hooks/useRole";
export default function DashboardSidebar() {
  const NavItem = ({ to, icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
          isActive
            ? "bg-blue-100 text-blue-600"
            : "text-gray-700 hover:bg-gray-200"
        }`
      }
    >
      {icon} {label}
    </NavLink>
  );

  const { role, loading } = useRole();

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <nav className="flex flex-col gap-4">
      <NavItem to="/dashboard" label="Dashboard Home" />

      {role === "admin" && (
        <>
          <NavItem to="/dashboard/all-users" label="All Users" />
          <NavItem to="/dashboard/my-requests" label="All Requests" />
        </>
      )}

      {(role === "volunteer" || role === "donor") && (
        <NavItem to="/dashboard/my-requests" label="My Requests" />
      )}

      <NavItem to="/dashboard/profile" label="Profile" />
    </nav>
  );
}
