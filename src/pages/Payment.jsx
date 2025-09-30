import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

export default function Payment() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const { period, price } = location.state || {};

  if (!period || !price) return null;

  const handlePayNow = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/subscriptions`, {
        email: user.email,
        period,
        price,
      });

      Swal.fire({
        title: "Payment successful!",
        html: `Plan: <b>${period}</b><br/>Price: <b>$${price}</b>`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      queryClient.invalidateQueries(["users"]);
      navigate("/premium-article");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Payment failed. Try again.", "error");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#b2d8d8]">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Summary</h1>
        <p className="text-gray-700 mb-2">
          Plan: <strong>{period}</strong>
        </p>
        <p className="text-gray-700 mb-6">
          Price: <strong>${price}</strong>
        </p>

        <button
          onClick={handlePayNow}
          className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold py-3 rounded-lg transition-transform duration-200 hover:scale-105 shadow-md"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
