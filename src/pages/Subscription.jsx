import { useState } from "react";
import { useNavigate } from "react-router";
import { CreditCard } from "lucide-react";

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
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 py-12 gap-12 bg-gray-100">
      {/* Left Image */}
      <div
        className="w-full md:w-1/2 rounded-3xl overflow-hidden shadow-2xl"
        style={{
          height: "600px",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(https://i.ibb.co/RkRgyKBY/subcribes.jpg)`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          // backgroundRepeat: "no-repeat",
        }}
      >
        {/* <div className="h-full w-full bg-gradient-to-b from-black/30 to-black/10 flex flex-col justify-center items-center text-white text-center p-6">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 drop-shadow-md">
            Upgrade Your Experience
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Choose a plan that fits your lifestyle and unlock full access.
          </p>
        </div> */}
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 max-w-lg backdrop-blur-2xl bg-white/20 shadow-2xl rounded-3xl px-8 py-15 border-2 border-cyan-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-100/20 to-green-100/20 pointer-events-none"></div>

        <h2 className="text-4xl font-extrabold text-black mb-6 text-center">
          Choose Your Plan
        </h2>

        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full shadow-md">
            <CreditCard className="text-white w-7 h-7" />
          </div>
        </div>

        <input
          type="text"
          placeholder="Card Number"
          className="w-full mb-4 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none placeholder-gray-400"
        />

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="w-full mb-6 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-gray-700"
        >
          <option value="">Select Period</option>
          <option>1 minute</option>
          <option>2 minute</option>
          <option>5 days</option>
          <option>10 days</option>
        </select>

        {period && (
          <div className="text-center mb-6 text-gray-700">
            <p className="text-sm">You selected:</p>
            <p className="text-xl font-semibold">
              {period} —{" "}
              <span className="text-cyan-600">
                {prices[period] === "FREE" ? "FREE" : `$${prices[period]}`}
              </span>
            </p>
          </div>
        )}

        <button
          onClick={handlePay}
          disabled={!period}
          className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-transform duration-200 hover:scale-[1.03] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {period
            ? prices[period] === "FREE"
              ? "Start Free Trial"
              : `Pay $${prices[period]}`
            : "Choose Plan"}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          🔒 Secure payment — your information is safe with us.
        </p>
      </div>
    </div>
  );
}
