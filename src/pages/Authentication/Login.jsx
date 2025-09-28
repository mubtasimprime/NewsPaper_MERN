import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import useGoogleAuth from "../../hooks/useGoogleAuth";

const Login = () => {
  const { signInWithEmail } = useAuth();
  const handleGoogleAuth = useGoogleAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    signInWithEmail(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("Logged in successfully!");
        navigate(from);
      })
      .catch((error) => {
        toast.error("Invalid email or password");
        console.log(error);
      });
  };

  return (
    <div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: "url(https://i.ibb.co.com/QFnVm0XT/signin.jpg)",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
      <div className="w-full max-w-md mx-4">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-3 tracking-tight noto">
              PRIME
            </h1>
            <h2 className="text-2xl font-bold text-3 mb-3 noto">NEWS</h2>
            <p className="text-3 text-sm">
              News is the presentation of information. Log In Now !
            </p>
          </div>

          {/* Login Form */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-4">SIGN IN</h3>
              <div className="text-sm">
                <span className="text-3">Don't have an account? </span>
                <Link
                  to="/auth/register"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-3 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-3 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", { required: true, minLength: 6 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="••••••••"
                  required
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-500">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500">
                    Password must be 6 characters or longer
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#004c4c] hover:bg-[#006666] text-white font-medium py-2 px-4 rounded-lg transition duration-200 focus:outline-none cursor-pointer"
              >
                Log in now
              </button>
            </form>

            <div className="mt-4 text-center">
              <button className="text-sm text-3 hover:underline">
                Forget password? Click Here !
              </button>
            </div>
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

export default Login;
