import { Link, NavLink } from "react-router";
import Logo from "../../assets/fav-logo.png";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { FaHome } from "react-icons/fa";
import { RiArticleFill } from "react-icons/ri";
import { PiArticleFill } from "react-icons/pi";
import { MdSubscriptions } from "react-icons/md";
import { auth } from "../../firebase/firebase.init";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { GrArticle } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  // fetch role
  const { data: roleData } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user-role?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (roleData) setRole(roleData.role);
  }, [roleData]);

  // fetch subscription
  const { data: subscription } = useQuery({
    queryKey: ["subscription", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/subscriptions/${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const isPremium = subscription?.premium || false;

  // auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
      toast.success("Logout successful!", { autoClose: 1500 });
    });
  };


  const publicNavItems = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={({ isActive }) =>
            `flex items-center gap-1 ${isActive ? "text-4" : "text-black"}`
          }
        >
          <FaHome size={20} /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-article"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={({ isActive }) =>
            `flex items-center gap-1 ${isActive ? "text-4" : "text-black"}`
          }
        >
          <RiArticleFill /> Add Articles
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-articles"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={({ isActive }) =>
            `flex items-center gap-1 ${isActive ? "text-4" : "text-black"}`
          }
        >
          <PiArticleFill /> All Articles
        </NavLink>
      </li>
    </>
  );

  const privateNavItems = (
    <>
      {publicNavItems}
      {isPremium && (
        <li>
          <NavLink
            to="/premium-article"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={({ isActive }) =>
              `flex items-center gap-1 ${
                isActive
                  ? "text-yellow-600 font-bold"
                  : "text-yellow-600 font-semibold"
              }`
            }
          >
            ⭐ Premium
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to="/subscription"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={({ isActive }) =>
            `flex items-center gap-1 ${isActive ? "text-4" : "text-black"}`
          }
        >
          <MdSubscriptions /> Subscription
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-articles"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={({ isActive }) =>
            `flex items-center gap-1 ${isActive ? "text-4" : "text-black"}`
          }
        >
          <GrArticle /> Articles
        </NavLink>
      </li>
      {role === "admin" && (
        <li>
          <NavLink
            to="/dashboard"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={({ isActive }) =>
              `flex items-center gap-1 ${isActive ? "text-4" : "text-black"}`
            }
          >
            <MdDashboard /> Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar max-w-9/12 mx-auto">
      {/* Left: Logo & Mobile menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {user ? privateNavItems : publicNavItems}
            {!user && (
              <>
                <li>
                  <Link to="/auth/login" className="flex items-center gap-2">
                    <FaSignInAlt /> SignIn
                  </Link>
                </li>
                <li>
                  <Link to="/auth/register" className="flex items-center gap-2">
                    <FaUserPlus /> SignUp
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3"
        >
          <img className="w-12 h-12" src={Logo} alt="Logo" />
          <h1 className="md:text-2xl">
            Prime<span className="text-3 font-black">News</span>
          </h1>
        </Link>
      </div>

      {/* Center nav (desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-8 items-center justify-center text-lg font-medium">
          {user ? privateNavItems : publicNavItems}
        </ul>
      </div>

      {/* Right: Auth buttons / Avatar */}
      <div className="navbar-end">
        {!user ? (
          <div className="hidden lg:flex gap-3">
            <Link
              to="/auth/login"
              className="bg-[#004c4c] hover:bg-[#006666] text-white px-5 py-1 rounded-md transition duration-300"
            >
              SignIn
            </Link>
            <Link
              to="/auth/register"
              className="bg-[#004c4c] hover:bg-[#006666] text-white px-5 py-1 rounded-md transition duration-300"
            >
              SignUp
            </Link>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border border-green-300">
                <img alt="User Avatar" src={user.photoURL || null} />
              </div>
            </div>
            <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40">
              <li className="text-center">
                <span className="font-semibold text-sm">
                  {user.displayName || "User"}
                </span>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
