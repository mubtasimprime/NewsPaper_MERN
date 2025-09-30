import { useState } from "react";
import { useNavigate } from "react-router";

export default function Subscription() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState("");

  const prices = {
    "1 minute": "FREE",
    "2 minute": 5,
    "5 days": 20,
    "10 days": 35,
  };

  const handlePay = () => {
    if (!period) return;
    navigate("/subscription/payment", {
      state: { period, price: prices[period] },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div
        className="h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/Qjm1H5T4/sub.jpg')",
        }}
      >
        <div className="h-full w-full bg-black/30"></div>
      </div>

      <div className="flex-grow flex justify-center items-center py-12 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="backdrop-blur-md bg-white/70 shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Choose Your Plan
          </h2>

          {/* Card Number */}
          <input
            type="text"
            placeholder="Card Number"
            className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          />

          {/* Period Dropdown */}
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full mb-6 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-gray-700"
          >
            <option value="">Select Period</option>
            <option>1 minute</option>
            <option>2 minute</option>
            <option>5 days</option>
            <option>10 days</option>
          </select>

          {/* Pay Button */}
          <button
            onClick={handlePay}
            disabled={!period}
            className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold py-3 rounded-lg transition-transform duration-200 hover:scale-105 shadow-md disabled:opacity-60"
          >
            {period ? `Pay $${prices[period]}` : "Pay"}
          </button>
        </div>
      </div>
    </div>
  );
}
