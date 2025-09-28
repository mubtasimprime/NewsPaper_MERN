import { Link } from "react-router";

const DashboardSidebar = ({ userRole }) => {
  return (
    <div className="flex flex-col space-y-4">
      <Link to="/dashboard">Dashboard Home</Link>
      <Link to="/dashboard/profile">Profile</Link>
      <Link to="/">Home</Link>

      {/* Admin-only links */}
      {userRole === "admin" && (
        <>
          <Link to="/dashboard/users">All Users Page</Link>
          <Link to="/dashboard/articles">All Articles Page</Link>
          <Link to="/dashboard/add-publisher">Add Publisher Page</Link>
        </>
      )}
    </div>
  );
};

export default DashboardSidebar;
