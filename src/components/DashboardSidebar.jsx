import { NavLink } from "react-router";
import { MdDashboard, MdHome } from "react-icons/md";
import {
  FaUserCircle,
  FaUsers,
  FaNewspaper,
  FaPlusCircle,
  FaArrowLeft,
} from "react-icons/fa";

const DashboardSidebar = ({ userRole, closeSidebar }) => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-2 py-1 rounded transition
     ${
       isActive
         ? "text-white bg-[#006666] font-semibold"
         : "text-gray-700 hover:bg-[#004c4c] hover:text-white"
     }`;

  return (
    <div className="flex flex-col h-full justify-between">
      {/* top section */}
      <div className="flex flex-col space-y-4">
        <NavLink to="/" className={linkClasses} onClick={closeSidebar}>
          <MdHome className="text-lg" />
          Home Page
        </NavLink>

        {userRole === "admin" && (
          <>
            <NavLink
              to="/dashboard"
              end
              className={linkClasses}
              onClick={closeSidebar}
            >
              <MdDashboard className="text-lg" />
              Overview
            </NavLink>

            <NavLink
              to="/dashboard/users"
              className={linkClasses}
              onClick={closeSidebar}
            >
              <FaUsers className="text-lg" />
              All Users Page
            </NavLink>

            <NavLink
              to="/dashboard/articles"
              className={linkClasses}
              onClick={closeSidebar}
            >
              <FaNewspaper className="text-lg" />
              All Articles Page
            </NavLink>

            <NavLink
              to="/dashboard/add-publisher"
              className={linkClasses}
              onClick={closeSidebar}
            >
              <FaPlusCircle className="text-lg" />
              Add Publisher Page
            </NavLink>
          </>
        )}

        {userRole === "user" && (
          <NavLink
            to="/dashboard/profile"
            className={linkClasses}
            onClick={closeSidebar}
          >
            <FaUserCircle className="text-lg" />
            Profile
          </NavLink>
        )}
      </div>

      {/* bottom section – Home Page */}
      <div className="mt-6">
        <NavLink to="/" className={linkClasses} onClick={closeSidebar}>
          <FaArrowLeft className="text-lg" />
          Home Page
        </NavLink>
      </div>
    </div>
  );
};

export default DashboardSidebar;
