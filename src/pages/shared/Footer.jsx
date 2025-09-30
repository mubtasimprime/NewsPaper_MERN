import { Link } from "react-router";
import Logo from "../../assets/fav-logo.png";
import { FaHome } from "react-icons/fa";
import { RiArticleFill } from "react-icons/ri";
import { PiArticleFill, PiArticleMediumFill } from "react-icons/pi";
import { MdSubscriptions } from "react-icons/md";
import { GrArticle } from "react-icons/gr";

const Footer = ({ user, isPremium }) => {
  const navItems = (
    <>
      <li>
        <Link className="flex items-center gap-1 hover:text-yellow-400" to="/">
          <FaHome size={18} /> Home
        </Link>
      </li>
      <li>
        <Link
          className="flex items-center gap-1 hover:text-yellow-400"
          to="/all-articles"
        >
          <PiArticleFill size={18} /> All Articles
        </Link>
      </li>
      {isPremium && (
        <li>
          <Link
            className="flex items-center gap-1 text-yellow-400 font-semibold hover:text-yellow-500"
            to="/premium-article"
          >
            ⭐ Premium
          </Link>
        </li>
      )}
      <li>
        <Link
          className="flex items-center gap-1 hover:text-yellow-400"
          to="/subscription"
        >
          <MdSubscriptions size={18} /> Subscription
        </Link>
      </li>
      {user && (
        <>
          <li>
            <Link
              className="flex items-center gap-1 hover:text-yellow-400"
              to="/profile"
            >
              <PiArticleMediumFill size={18} /> Profile
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-1 hover:text-yellow-400"
              to="/my-articles"
            >
              <GrArticle size={18} /> My Articles
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <footer className="bg-[#004c4c] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-9/12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                className="w-12 h-12 md:w-16 md:h-16"
                src={Logo}
                alt="Logo"
              />
              <h1 className="md:text-2xl">
                Prime<span className="text-1 font-black">News</span>
              </h1>
            </Link>
            <p className="text-gray-300 text-sm">
              Stay updated with the latest news and premium content from your
              favorite sources.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h3 className="font-bold text-lg">Quick Links</h3>
            <ul className="flex flex-col gap-2 text-gray-300">{navItems}</ul>
          </div>

          {/* Services */}
          <div className="space-y-2">
            <h3 className="font-bold text-lg">Services</h3>
            <ul className="flex flex-col gap-2 text-gray-300">
              <Link className="hover:text-white">Email Marketing</Link>
              <Link className="hover:text-white">Campaigns</Link>
              <Link className="hover:text-white">Branding</Link>
              <Link className="hover:text-white">Offline</Link>
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-2">
            <h3 className="font-bold text-lg">Help</h3>
            <ul className="flex flex-col gap-2 text-gray-300">
              <Link className="hover:text-white">FAQs</Link>
              <Link className="hover:text-white">Contact Us</Link>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-400 mt-8 pt-6 text-sm text-gray-200 text-center">
          © {new Date().getFullYear()} Prime News. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
