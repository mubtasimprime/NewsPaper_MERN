import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../shared/Loading";
import useAuth from "../../hooks/useAuth";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user: loggedInUser } = useAuth();

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/all-users`
        );
        setUsers(res.data);
      } catch (err) {
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Change user role (admin <-> user)
  const updateRole = async (id, newRole) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/role/${id}`,
        { role: newRole }
      );
      if (res.data.modifiedCount > 0) {
        toast.success(`Role updated to ${newRole}`);
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
        );
      }
    } catch {
      toast.error("Failed to update role");
    }
  };

  if (loading) return <Loading></Loading>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th className="text-center">Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <td>{i + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={user.photoURL || "/default-avatar.png"}
                        alt={user.name}
                      />
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="text-center capitalize">{user.role}</td>
                <td className="text-center">
                  {user.email === loggedInUser.email ? (
                    <span className="text-green-800">Admin</span>
                  ) : user.role === "admin" ? (
                    <button
                      onClick={() => updateRole(user._id, "user")}
                      className="btn btn-sm btn-warning"
                    >
                      Make User
                    </button>
                  ) : (
                    <button
                      onClick={() => updateRole(user._id, "admin")}
                      className="btn btn-sm btn-success"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
