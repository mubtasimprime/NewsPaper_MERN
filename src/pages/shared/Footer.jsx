import React from "react";
import Logo from "../../assets/fav-logo.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#6A0B37] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-9/12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and CTA */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <img className="w-12 h-12 md:w-16 md:h-16" src={Logo} alt="" />
              <h1 className="md:text-2xl">
                Donate <span className="text-1 font-black">Blood</span>
              </h1>
            </Link>
            <div className="flex flex-col items-start gap-2">
              <button className="bg-[#B32346] text-white px-6 py-2 rounded-md transition">
                Ready to get started
              </button>
              <Link className="border border-gray-400 px-6 py-2 rounded-md hover:bg-[#B32346] transition">
                Donate
              </Link>
            </div>
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

          {/* About */}
          <div className="space-y-2">
            <h3 className="font-bold text-lg">About</h3>
            <ul className="flex flex-col gap-2 text-gray-300">
              <Link className="hover:text-white">Our Story</Link>
              <Link className="hover:text-white">Benefits</Link>
              <Link className="hover:text-white">Team</Link>
              <Link className="hover:text-white">Careers</Link>
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

        {/* Bottom border */}
        <div className="border-t border-gray-300 mt-8 pt-8 text-sm text-gray-100">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
