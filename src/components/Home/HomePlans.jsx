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
        "15 hours/month of listening",
      ],
      button: "Try Free for 1 Month",
      color: "from-pink-400 to-pink-600 text-white",
    },
    {
      title: "Demo Plan",
      price: "$5.00",
      desc: ["2 Minutes", "Short demo plan", "Cancel anytime"],
      button: "Try Demo",
      color: "from-green-400 to-green-600 text-white",
    },
    {
      title: "Premium Duo",
      price: "$20.00",
      desc: ["2 Premium accounts", "Cancel anytime", "15 hours/month"],
      button: "Get Premium Duo",
      color: "from-yellow-400 to-yellow-600 text-gray-900",
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
      color: "from-blue-400 to-blue-600 text-white",
      featured: true,
    },
  ];

  const handleSelect = (plan) => {
    navigate("/subscription", { state: { plan } });
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center py-16 px-6">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center">
        Choose Your Plan
      </h2>
      <p className="text-gray-600 max-w-2xl text-center mb-12">
        Pick the plan that matches your listening lifestyle. Cancel anytime — no
        hidden fees.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative bg-white rounded-2xl shadow-md border border-gray-200 p-8 flex flex-col justify-between transition-transform hover:-translate-y-2 hover:shadow-2xl ${
              plan.featured ? "scale-105 border-blue-400 shadow-blue-100" : ""
            }`}
          >
            {plan.featured && (
              <span className="absolute top-0 left-0 bg-blue-500 text-white text-sm px-3 py-1 rounded-br-lg rounded-tl-2xl">
                Most Popular
              </span>
            )}

            {/* Content area */}
            <div className="flex flex-col flex-1 items-center text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {plan.title}
              </h3>
              <p className="text-3xl font-extrabold mb-4">{plan.price}</p>
              <ul className="text-gray-600 mb-8 space-y-2 text-sm text-center flex-1">
                {plan.desc.map((d, i) => (
                  <li key={i}>• {d}</li>
                ))}
              </ul>
            </div>

            {/* Button area */}
            <button
              onClick={() => handleSelect(plan)}
              className={`w-full py-3 rounded-lg font-semibold bg-gradient-to-r ${plan.color} shadow-md hover:opacity-90 transition cursor-pointer`}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
