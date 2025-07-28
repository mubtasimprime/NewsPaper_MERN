import {
  FaUserCheck,
  FaBell,
  FaUserPlus,
  FaMapMarkedAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaUserCheck className="text-3xl text-[#B32346]" />,
    title: "Verified Donors",
    description:
      "All donors are verified and regularly updated for safety and trust.",
  },
  {
    icon: <FaBell className="text-3xl text-[#B32346]" />,
    title: "Urgent Request Alerts",
    description: "Get real-time alerts for urgent blood requirements near you.",
  },
  {
    icon: <FaUserPlus className="text-3xl text-[#B32346]" />,
    title: "Easy Registration",
    description: "Quick and simple process to become a blood donor in minutes.",
  },
  {
    icon: <FaMapMarkedAlt className="text-3xl text-[#B32346]" />,
    title: "Location-Based Matching",
    description: "Connect with donors and recipients based on your location.",
  },
];

const HomeFeature = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Why Choose DonateBlood?
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-12">
          Our platform ensures fast, safe, and reliable blood donation and
          request management.
        </p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
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
