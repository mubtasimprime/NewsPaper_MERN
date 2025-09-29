import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../shared/Loading";

const Profile = () => {
  const { user } = useAuth();

  const [role, setRole] = useState("");
  const [loadingRole, setLoadingRole] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/user-role`,
          { params: { email: user.email } }
        );
        setRole(data.role);
      } catch {
        toast.error("Failed to load role");
      } finally {
        setLoadingRole(false);
      }
    };

    fetchRole();
  }, [user?.email]);

  if (loadingRole) return <Loading></Loading>;

  return (
    <div className="max-w-md mx-auto bg-white text-3 rounded-2xl p-6">
      <div className="flex flex-col items-center mb-6">
        <img
          src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
          alt="avatar"
          className="w-36 h-36 rounded-full border-4 border-[#b2d8d8] mb-3"
        />
        <span className="uppercase text-sm tracking-wide bg-[#b2d8d8] px-3 py-1 rounded-full">
          {role}
        </span>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-[#b2d8d8] rounded-lg flex items-center gap-3">
          <span className="font-medium">Name:</span> {user.displayName || "—"}
        </div>
        <div className="p-4 bg-[#b2d8d8] rounded-lg flex items-center gap-3">
          <span className="font-medium">Email:</span> {user.email}
        </div>
      </div>
    </div>
  );
};

export default Profile;
