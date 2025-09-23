import { Link, NavLink } from "react-router";
import Logo from "../../assets/fav-logo.png";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { FaHome } from "react-icons/fa";
import { RiArticleFill } from "react-icons/ri";
import { PiArticleFill } from "react-icons/pi";
import { MdSubscriptions } from "react-icons/md";
import { PiArticleMediumFill } from "react-icons/pi";
import { auth } from "../../firebase/firebase.init";

const Navbar = () => {
  const [user, setUser] = useState(null);
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

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={({ isActive }) =>
            isActive
              ? "text-4 font-semibold flex items-center gap-1"
              : "hover:scale-105 flex items-center gap-1"
          }
        >
          <FaHome size={20} />
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          to="/add-article"
          className={({ isActive }) =>
            isActive
              ? "text-4 font-semibold flex items-center gap-1"
              : "hover:scale-105 flex items-center gap-1"
          }
        >
          <RiArticleFill />
          Add Articles
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          to="/all-articles"
          className={({ isActive }) =>
            isActive
              ? "text-4 font-semibold flex items-center gap-1"
              : "hover:scale-105 flex items-center gap-1"
          }
        >
          <PiArticleFill />
          All Articles
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            to="/subscription"
            className={({ isActive }) =>
              isActive
                ? "text-4 font-semibold flex items-center gap-1"
                : "hover:scale-105 flex items-center gap-1"
            }
          >
            <MdSubscriptions />
            Subscription
          </NavLink>
        </li>
      )}

      {user && (
        <li>
          <NavLink
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            to="/my-articles"
            className={({ isActive }) =>
              isActive
                ? "text-4 font-semibold flex items-center gap-1"
                : "hover:scale-105 flex items-center gap-1"
            }
          >
            <PiArticleMediumFill />
            My Articles
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar max-w-9/12 mx-auto">
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
            {navItems}
          </ul>
        </div>
        <Link
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          to="/"
          className="flex items-center gap-3"
        >
          <img className="w-12 h-12 md:w-12 md:h-12" src={Logo} alt="" />
          <h1 className="md:text-2xl">
            Prime<span className="text-3 font-black">News</span>
          </h1>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-6 items-center justify-center text-lg font-medium text-4">
          {navItems}
        </ul>
      </div>

      {/* Right side avatar / login */}
      <div className="navbar-end">
        {!user ? (
          <div className="flex gap-3">
            <Link
              to="/auth/login"
              className="bg-[#004c4c] hover:bg-[#006666] transition duration-300 text-white px-5 py-1 rounded-md"
            >
              SignIn
            </Link>
            <Link
              to="/auth/register"
              className="bg-[#004c4c] hover:bg-[#006666] transition duration-300 text-white px-5 py-1 rounded-md"
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
              <div className="w-10 rounded-full border">
                <img
                  alt="User Avatar"
                  src={
                    user.photoURL || "https://i.ibb.co/ZYW3VTp/blood-avatar.png"
                  }
                />
              </div>
            </div>
            <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40">
              <li className="text-center">
                <span className="font-semibold text-sm">
                  {user.displayName || "User"}
                </span>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
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
