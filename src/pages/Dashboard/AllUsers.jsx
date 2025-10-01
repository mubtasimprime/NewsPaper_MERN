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

  if (loading) return <Loading />;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
        All Users
      </h1>

      <div className="overflow-x-auto">
        <table className="table w-full table-zebra bg-transparent min-w-[600px]">
          <thead className="bg-gray-200">
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
              <tr key={user._id} className="hover:bg-gray-100">
                <td>{i + 1}</td>
                <td>
                  <div className="avatar w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={
                        user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt={user.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </td>
                <td className="truncate max-w-[100px]">{user.name}</td>
                <td className="truncate max-w-[150px]">{user.email}</td>
                <td className="text-center capitalize">{user.role}</td>
                <td className="text-center flex flex-col md:flex-row gap-1 justify-center">
                  {user.email === loggedInUser.email ? (
                    <span className="text-green-800 font-semibold">Admin</span>
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
