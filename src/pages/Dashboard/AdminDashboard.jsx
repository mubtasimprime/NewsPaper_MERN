import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const handleRoleChange = async (e, email) => {
    const role = e.target.value;
    setLoading(true);

    try {
      const { data } = await axiosSecure.patch("/update-role", { email, role });

      if (data.success) {
        setUsers(
          users.map((user) => (user.email === email ? { ...user, role } : user))
        );
        toast.success("Role updated successfully");
      } else {
        toast.error("Failed to update role");
      }
    } catch (error) {
      toast.error("Error updating role");
      console.error("Update role error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axiosSecure.get(
          `/get-users?email=${user?.email}`
        );
        setUsers(data);
      } catch (error) {
        toast.error("Failed to load users");
        console.error("Fetch users error:", error);
      }
    };

    if (user?.email) fetchUsers();
  }, [user?.email]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="space-y-4">
        {users.map((userData) => {
          const isCurrentAdmin = userData.email === user?.email;

          return (
            <div
              key={userData.email}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-white rounded-2xl shadow-md border border-gray-200"
            >
              <div className="flex-1">
                <div className="text-gray-700 font-medium">
                  Email: <span className="text-blue-600">{userData.email}</span>
                </div>
                <div className="text-gray-700 font-medium mt-2">
                  Role: <span className="text-blue-600">{userData.role}</span>
                </div>
                <div className="text-gray-700 font-medium mt-2">
                  <label
                    htmlFor={`role-${userData.email}`}
                    className="block mb-1"
                  >
                    Change Role:
                  </label>
                  <select
                    value={userData.role}
                    onChange={(e) => handleRoleChange(e, userData.email)}
                    disabled={loading || isCurrentAdmin}
                    id={`role-${userData.email}`}
                    className="px-3 py-2 border border-gray-300 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-auto"
                  >
                    <option value="admin">Admin</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="user">User</option>
                  </select>
                  {isCurrentAdmin && (
                    <p className="text-sm text-red-500 mt-1">
                      You can't change your own role.
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
