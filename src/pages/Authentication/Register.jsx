import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FaUpload, FaUserGraduate } from "react-icons/fa";
import axios from "axios";
import useGoogleAuth from "../../hooks/useGoogleAuth";

const Register = () => {
  const { signUpWithEmail, updateUser, setUser } = useAuth();
  const handleGoogleAuth = useGoogleAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const [previewImage, setPreviewImage] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];

    setPreviewImage(URL.createObjectURL(image));
    setUploading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const imageUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_upload_key
      }`;

      const res = await axios.post(imageUrl, formData);
      const hostedUrl = res.data.data.url;

      setAvatarUrl(hostedUrl);
      toast.success("Image uploaded");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      await signUpWithEmail(data.email, data.password);

      await updateUser({
        displayName: data.name,
        photoURL: avatarUrl || "https://i.ibb.co/4pDNDk1/avatar.png",
      });

      const now = new Date().toISOString();
      const newUser = {
        name: data.name,
        email: data.email,
        photoURL: avatarUrl || "https://i.ibb.co/4pDNDk1/avatar.png",
        role: "user",
        createdAt: now,
        lastLoggedIn: now,
        premiumTaken: null,
      };
      await axios.post(`${import.meta.env.VITE_API_URL}/add-user`, newUser);
      setUser(newUser);
      toast.success("Registration successful");
      navigate(from);
    } catch (error) {
      toast.error("Registration failed");
      console.log(error);
    }
  };
  return (
    <div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-cover bg-center py-10 md:py-0"
      style={{
        backgroundImage: "url(https://i.ibb.co.com/SXQYs713/signup.jpg)",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
      <div className="w-full max-w-lg mx-4">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-5 tracking-tight noto">
              PRIME
            </h1>
            <h2 className="text-2xl font-bold text-5 mb-3 noto">NEWS</h2>
            <p className="text-3 text-sm">
              Join our community of Latest News. Registration Now !
            </p>
          </div>

          {/* Registration Form */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-3">REGISTER</h3>
              <div className="text-sm">
                <span className="text-3">Already have an account? </span>
                <Link
                  to="/auth/login"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Log in
                </Link>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {/* Column 1 */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-3 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name", { required: true, minLength: 6 })}
                      className="w-full px-4 py-2 border border-[#b2d8d8] rounded-lg focus:ring-2 focus:ring-[#66b2b2] focus:border-[#66b2b2] outline-none transition"
                      placeholder="Enter your name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name?.type === "required"
                          ? "Name is required"
                          : "Name must be at least 6 characters"}
                      </p>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-sm text-3">
                      Profile Picture
                    </label>
                    <div className="flex items-center gap-4">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-16 h-16 rounded-full object-cover border-1 border-[#004c4c]"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-[#004c4c] flex items-center justify-center">
                          <span className="text-white border-none">
                            <FaUserGraduate size={28} />
                          </span>
                        </div>
                      )}
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
                              <span className="text-gray-500">
                                Upload Image
                              </span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </div>
                      </label>
                    </div>
                    {/* <input {...register("photoUrl")} type="hidden" /> */}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-3 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email", { required: true })}
                      className="w-full px-4 py-2 border border-[#b2d8d8] rounded-lg focus:ring-2 focus:ring-[#66b2b2] focus:border-[#66b2b2] outline-none transition"
                      placeholder="Enter your mail"
                    />
                    {errors.email?.type === "required" && (
                      <p className="text-red-500">Email is required</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-3 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register("password", {
                      required: true,
                      validate: {
                        minLength: (v) =>
                          v.length >= 6 ||
                          "Password must be at least 6 characters",
                        capital: (v) =>
                          /[A-Z]/.test(v) ||
                          "Must include at least one capital letter",
                        special: (v) =>
                          /[!@#$%^&*(),.?":{}|<>]/.test(v) ||
                          "Must include at least one special character",
                        number: (v) =>
                          /\d/.test(v) || "Must include at least one number",
                      },
                    })}
                    className="w-full px-4 py-2 border border-[#b2d8d8] rounded-lg focus:ring-2 focus:ring-[#66b2b2] focus:border-[#66b2b2] outline-none transition"
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-[#004c4c] hover:bg-[#006666] text-white font-medium py-2 px-4 rounded-lg transition duration-200 focus:outline-none cursor-pointer"
              >
                Register Now
              </button>
            </form>
            <div className="divider text-gray-400 dark:text-gray-500 mt-6">
              OR
            </div>

            {/* Google Login */}
            <button
              onClick={handleGoogleAuth}
              type="button"
              className="btn w-full flex items-center justify-center gap-2 border-gray-300"
            >
              <FcGoogle size={20} /> Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
