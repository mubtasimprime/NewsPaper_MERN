import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      name: "",
      avatar: "",
      district: "",
      upazila: "",
      bloodGroup: "",
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const { data } = await axiosSecure.get(`/user?email=${user.email}`);

        if (data) {
          setUserData(data);
          reset({
            name: data.name || "",
            avatar: data.avatar || "",
            district: data.district || "",
            upazila: data.upazila || "",
            bloodGroup: data.bloodGroup || "",
          });
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error(error.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchUserData();
  }, [user?.email]); // Only depend on user.email

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        name: data.name,
        avatar: data.avatar,
        district: data.district,
        upazila: data.upazila,
        bloodGroup: data.bloodGroup,
      };

      const { data: res } = await axiosSecure.patch(
        `/update-user/${user.email}`,
        updatedData
      );

      if (res.modifiedCount > 0) {
        toast.success("Profile updated!");
        setUserData((prev) => ({ ...prev, ...updatedData }));
        setIsEditing(false);
      } else {
        toast.info("No changes detected");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  if (loading)
    return <div className="text-center py-8">Loading profile...</div>;

  if (!userData)
    return <div className="text-center py-8">No profile data found</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={() => {
              reset(userData);
              setIsEditing(false);
            }}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
      </div>

      <form
        key={isEditing ? "edit" : "read"}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {userData.avatar && (
          <div className="flex justify-center">
            <img
              src={userData.avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              className="w-full px-3 py-2 border rounded bg-gray-100"
              disabled
              readOnly
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Avatar URL
          </label>
          <input
            type="url"
            {...register("avatar")}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              District
            </label>
            <input
              type="text"
              {...register("district")}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upazila
            </label>
            <input
              type="text"
              {...register("upazila")}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!isEditing}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blood Group
          </label>
          <select
            {...register("bloodGroup")}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isEditing}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        {isEditing && (
          <div className="pt-4">
            <button
              type="submit"
              disabled={!isDirty}
              className={`w-full px-4 py-2 rounded text-white font-medium ${
                isDirty
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
