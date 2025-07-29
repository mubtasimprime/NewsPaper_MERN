import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password");

  const { signUpWithEmail } = useAuth();

  const onSubmit = (data) => {
    // console.log(data);
    signUpWithEmail(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("Register in successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Already Exist Email");
      });
  };

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));

    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data));
  }, []);

  //   signUpWithEmail(email, password)
  //     .then((result) => {
  //       const user = result.user;
  //       updateUser({
  //         displayName: name,
  //         photoURL: photo,
  //       })
  //         .then(() => {
  //           setUser({ ...user, displayName: name, photoURL: photo });
  //           navigate("/");
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           setUser(user);
  //         });
  //       toast.success("Register successful!", {
  //         autoClose: 1500,
  //       });
  //     })
  //     .catch((error) => {
  //       const errorMessage = error.message;
  //       alert(errorMessage);
  //       // ..
  //     });
  // };

  return (
    <div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-cover bg-center py-10 md:py-0"
      style={{
        backgroundImage: "url(https://i.ibb.co/21LxNSMf/18300586-5969395.jpg)",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
      <div className="w-full max-w-4xl mx-4">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-red-700 tracking-tight">
              DONATE
            </h1>
            <h2 className="text-2xl font-bold text-red-700 mb-3">BLOOD</h2>
            <p className="text-gray-600 text-sm">
              Join our community of lifesavers. Your registration can help save
              lives.
            </p>
          </div>

          {/* Registration Form */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">REGISTER</h3>
              <div className="text-sm">
                <span className="text-gray-500">Already have an account? </span>
                <Link
                  to="/auth/login"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Login
                </Link>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Column 1 */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="Enter your mail"
                    />
                    {errors.email?.type === "required" && (
                      <p className="text-red-500">Email is required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name", { required: true, minLength: 6 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Blood Group
                    </label>
                    <select
                      id="bloodGroup"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      {...register("bloodGroup", {
                        required: true,
                      })}
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
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.bloodGroup?.type === "required" && (
                          <p className="text-red-500">
                            Blood Group is required
                          </p>
                        )}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      District
                    </label>
                    <select
                      id="district"
                      {...register("district", {
                        required: true,
                      })}
                      className="w-full px-4 py-2 border rounded-lg border-gray-300"
                    >
                      <option value="">Select District</option>
                      {districts.map((district) => (
                        <option key={district.id} value={district.name}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                    {errors?.district && (
                      <p className="text-red-500 text-sm mt-1">
                        District is required
                      </p>
                    )}
                  </div>
                </div>
                {/* Column 2 */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Upazila
                    </label>
                    <select
                      id="upazila"
                      {...register("upazila", {
                        required: true,
                      })}
                      className="w-full px-4 py-2 border rounded-lg border-gray-300"
                    >
                      <option value="">Select Upazila</option>
                      {upazilas.map((upazila) => (
                        <option key={upazila.id} value={upazila.name}>
                          {upazila.name}
                        </option>
                      ))}
                    </select>
                    {errors.upazila && (
                      <p className="text-red-500 text-sm mt-1">
                        Upazilla is required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      id="avatar"
                      accept="image/*"
                      {...register("avatar", {
                        required: "Profile picture is required",
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                    {errors.avatar && (
                      <p className="text-red-500 text-sm mt-1">
                        Profile Picture is required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        Password must be at least 6 characters
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      {...register("confirmPassword", {
                        required: true,
                        minLength: 6,
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        Password doesn't match
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
