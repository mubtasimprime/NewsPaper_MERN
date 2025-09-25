import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { auth } from "../../firebase/firebase.init";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { signUpWithEmail } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
  } = useForm();
  // const password = watch("password");

  const onSubmit = async (data) => {
    const { password, ...rest } = data;
    const userData = {
      ...rest,
      password,
      role: "donor",
      status: "active",
    };

    try {
      await signUpWithEmail(data.email, data.password);
      await updateProfile(auth.currentUser, {
        displayName: data.name,
        photoURL: data.avatar,
      });
      const res = await fetch(`${import.meta.env.VITE_API_URL}/add-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const result = await res.json();
      if (result.insertedId || result.message === "User already exists") {
        toast.success("Registration successful");
        navigate(from);
      } else {
        toast.warn("Something went wrong saving to database");
      }
    } catch (error) {
      toast.error("Registration failed");
      console.log(error);
    }
  };
  return (
    <div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-cover bg-center py-10 md:py-0"
      style={{
        backgroundImage: "url(https://i.ibb.co/21LxNSMf/18300586-5969395.jpg)",
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

                  <div>
                    <label className="block text-sm font-medium text-3 mb-1">
                      Profile Picture URL
                    </label>
                    <input
                      type="url"
                      {...register("avatar", {
                        required: "Profile picture URL is required",
                      })}
                      placeholder="Enter image URL"
                      className="w-full px-4 py-2 border border-[#b2d8d8] rounded-lg focus:ring-2 focus:ring-[#66b2b2] focus:border-[#66b2b2] outline-none transition"
                    />
                    {errors.avatar && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.avatar.message}
                      </p>
                    )}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
