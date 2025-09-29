import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Loading from "./shared/Loading";
import { FaUpload, FaUserGraduate } from "react-icons/fa";

const Profile = () => {
  const { user, setUser } = useAuth();

  const [role, setRole] = useState("");
  const [loadingRole, setLoadingRole] = useState(true);

  const [name, setName] = useState(user.name || user.displayName || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");
  const [previewImage, setPreviewImage] = useState(user.photoURL || null);

  const [isEditing, setIsEditing] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Fetch role
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

  // Handle file selection
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewImage(URL.createObjectURL(file));
    setPhotoFile(file);
  };

  // Save changes
  const handleSave = async () => {
    setLoadingUpdate(true);
    try {
      let uploadedURL = photoURL;

      // Upload to ImgBB if file selected
      if (photoFile) {
        setUploading(true);
        const formData = new FormData();
        formData.append("image", photoFile);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_image_upload_key
          }`,
          formData
        );
        uploadedURL = res.data.data.url;
        setPhotoURL(uploadedURL);
        setUploading(false);
      }

      // Update backend
      await axios.put(`${import.meta.env.VITE_API_URL}/update-profile`, {
        email: user.email,
        displayName: name,
        photoURL: uploadedURL,
      });

      setUser((prev) => ({
        ...prev,
        name: name,
        photoURL: uploadedURL,
      }));

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
      setUploading(false);
    } finally {
      setLoadingUpdate(false);
    }
  };

  if (loadingRole) return <Loading />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e0f2f2] p-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-6 border border-green-300 shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <img
            src={previewImage || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="avatar"
            className="w-36 h-36 rounded-full border-4 border-[#b2d8d8] mb-3 object-cover"
          />
          <span className="uppercase text-sm tracking-wide bg-[#b2d8d8] px-3 py-1 rounded-full">
            {role}
          </span>
        </div>

        <div className="space-y-4">
          {/* Name field */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Name:</label>
            <input
              type="text"
              className="p-2 rounded-lg border border-gray-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
            />
          </div>

          {/* Image upload */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Profile Image:</label>
            <div className="flex items-center gap-4">
              <label className="flex-1">
                <div className="btn border border-[#b2d8d8] w-full flex items-center justify-center gap-2 font-medium bg-white">
                  {uploading ? (
                    <>
                      <span className="loading loading-spinner text-primary"></span>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FaUpload />{" "}
                      <span className="text-gray-500">Choose Image</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={!isEditing}
                  />
                </div>
              </label>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-16 h-16 rounded-full border border-[#004c4c] object-cover"
                />
              )}
            </div>
          </div>

          {/* Email (read-only) */}
          <div className="p-4 bg-[#b2d8d8] rounded-lg flex items-center gap-3">
            <span className="font-medium">Email:</span> {user.email}
          </div>

          {/* Edit / Save / Cancel */}
          <div className="flex gap-3 justify-center">
            {!isEditing ? (
              <button
                className="bg-[#004c4c] text-white px-4 py-2 rounded-md"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                  onClick={handleSave}
                  disabled={loadingUpdate || uploading}
                >
                  Save
                </button>
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
