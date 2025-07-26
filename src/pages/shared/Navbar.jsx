import { Link, NavLink } from "react-router";
import Logo from "../../assets/logo_blood.png";

const Navbar = () => {
  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-10 font-semibold" : "hover:scale-105"
          }
        >
          Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink
          to="#"
          className={({ isActive }) =>
            isActive ? "text-10 font-semibold" : "hover:scale-105"
          }
        >
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink
          to="#"
          className={({ isActive }) =>
            isActive ? "text-10 font-semibold" : "hover:scale-105"
          }
        >
          LogIn
        </NavLink>
      </li>
      <li>
        <NavLink
          to="#"
          className={({ isActive }) =>
            isActive ? "text-10 font-semibold" : "hover:scale-105"
          }
        >
          Funding
        </NavLink>
      </li>
      <li>
        <NavLink
          to="#"
          className={({ isActive }) =>
            isActive ? "text-10 font-semibold" : "hover:scale-105"
          }
        >
          Blog
        </NavLink>
      </li>
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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <Link to="/" className="flex items-center">
          <img className="w-12 h-12 md:w-12 md:h-12" src={Logo} alt="" />
          <h1 className="md:text-2xl">
            Donate <span className="text-1 font-black">Blood</span>
          </h1>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-6 items-center justify-center text-lg font-medium text-10">
          {navItems}
        </ul>
      </div>

      {/* Right Side Buttons */}
    </div>
  );
};

export default Navbar;
