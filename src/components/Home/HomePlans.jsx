import { useNavigate } from "react-router";

export default function Subscription() {
  const navigate = useNavigate();

  const plans = [
    {
      title: "Premium Trial",
      price: "FREE",
      desc: [
        "1 Minute Trial",
        "1 Premium account",
        "Cancel anytime",
        "15 hours/month of listening from our audiobooks catalog",
      ],
      button: "Try free for 1 month",
      color: "bg-pink-100 hover:bg-pink-200 text-pink-700",
    },
    {
      title: "Premium Trial",
      price: "$ 5.00",
      desc: ["2 Minute", "Short demo plan", "Cancel anytime"],
      button: "Try Demo",
      color: "bg-green-200 hover:bg-green-300 text-green-800",
    },
    {
      title: "Premium Duo",
      price: "$20.00",
      desc: ["2 Premium accounts", "Cancel anytime", "15 hours/month"],
      button: "Get Premium Duo",
      color: "bg-yellow-200 hover:bg-yellow-300 text-yellow-800",
    },
    {
      title: "Premium Family",
      price: "$35.00",
      desc: [
        "Up to 6 Premium or Kids accounts",
        "Block Adult Content",
        "Cancel anytime",
        "20 hours/month",
      ],
      button: "Get Premium Family",
      color: "bg-blue-200 hover:bg-blue-300 text-blue-800",
    },
  ];

  const handleSelect = () => {
    navigate("/subscription");
  };

  return (
    <div className="bg-gray-50 py-12 flex flex-col items-center">
      <h2 className="text-[38px] leading-12 lg:text-[40px] font-extrabold mb-4">
        Choose Your Plan
      </h2>
      <p className="text-gray-700 max-w-[600px] mx-auto mb-8 text-center">
        Select the plan that suits your reading style. Our flexible options
        ensure you never miss the stories that matter most.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className="rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col bg-white hover:shadow-2xl transition"
          >
            <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
            <p className="text-lg font-bold mb-4">{plan.price}</p>
            <ul className="text-gray-600 mb-6 space-y-2 flex-1">
              {plan.desc.map((d, i) => (
                <li key={i}>• {d}</li>
              ))}
            </ul>
            <button
              onClick={handleSelect}
              className={`w-full py-3 rounded-lg font-semibold transition ${plan.color}`}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
