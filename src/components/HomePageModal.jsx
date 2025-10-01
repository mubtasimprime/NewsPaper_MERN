import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const HomePageModal = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 max-w-xl mx-auto">
      <div className="bg-green-50 rounded-xl shadow-2xl p-8 max-w-md w-full text-center relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={() => setShowModal(false)}
        >
          ✕
        </button>

        <h2 className="text-3xl font-extrabold mb-4 text-4">
          Subscribe Now!!!!
        </h2>
        <p className="text-gray-600 mb-6">
          Stay updated with the latest news and premium articles. Subscribe
          today to unlock exclusive features!
        </p>

        <button
          onClick={() => navigate("/subscription")}
          className="px-6 py-2 bg-[#004c4c] text-white rounded-lg hover:bg-[#006666] transition"
        >
          Go to Subscription
        </button>
      </div>
    </div>
  );
};

export default HomePageModal;
