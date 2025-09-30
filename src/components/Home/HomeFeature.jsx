import {
  FaRegNewspaper,
  FaBell,
  FaUserFriends,
  FaGlobeAmericas,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRegNewspaper size={50} className="text-3xl text-[#66b2b2]" />,
    title: "Trusted News",
    description:
      "Access reliable and fact-checked news from credible sources worldwide.",
  },
  {
    icon: <FaBell size={50} className="text-3xl text-[#66b2b2]" />,
    title: "Instant Alerts",
    description: "Stay informed with real-time notifications on breaking news.",
  },
  {
    icon: <FaUserFriends size={50} className="text-3xl text-[#66b2b2]" />,
    title: "Personalized Feed",
    description: "Get a tailored news experience based on your interests.",
  },
  {
    icon: <FaGlobeAmericas size={50} className="text-3xl text-[#66b2b2]" />,
    title: "Global Coverage",
    description:
      "Explore stories from around the world with diverse perspectives.",
  },
];

const HomeFeature = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-9/12 mx-auto text-center">
        <h2 className="text-[38px] leading-12 lg:text-[40px] font-extrabold mb-4">
          Why Choose Prime<span className="text-3">News?</span>
        </h2>
        <p className="text-gray-700 max-w-[600px] mx-auto mb-8">
          PrimeNews brings you fast, accurate, and personalized news updates so
          you never miss what matters most.
        </p>

        <div className="max-w-9/12 mx-auto md:max-w-full grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 lg:py-10 shadow-sm rounded-lg hover:scale-105 transition cursor-pointer border border-green-200"
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeature;
