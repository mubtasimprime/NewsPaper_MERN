import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const Register = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));

    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data));
  }, []);
  return (
    <div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url(https://i.ibb.co/ymvjGJSP/18300609-5969415.jpg)",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
      <div className="w-full max-w-4xl mx-4">
        {" "}
        {/* Increased max-width */}
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

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Column 1 */}
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="bloodGroup"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Blood Group
                    </label>
                    <select
                      id="bloodGroup"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      required
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

                  <div>
                    <label
                      htmlFor="district"
                      className="block text-sm font-medium mb-1"
                    >
                      District
                    </label>
                    <select
                      id="district"
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="">Select District</option>
                      {districts.map((district) => (
                        <option key={district.id} value={district.name}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Column 2 */}
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="upazila"
                      className="block text-sm font-medium mb-1"
                    >
                      Upazila
                    </label>
                    <select
                      id="upazila"
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="">Select Upazila</option>
                      {upazilas.map((upazila) => (
                        <option key={upazila.id} value={upazila.name}>
                          {upazila.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="avatar"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      id="avatar"
                      accept="image/*"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="••••••••"
                      required
                    />
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
