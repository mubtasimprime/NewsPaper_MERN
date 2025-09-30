import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CountUp from "react-countup";
import { Users, User, Star } from "lucide-react";
import Loading from "../../pages/shared/Loading";
import Lottie from "lottie-react";
import Celebration from "../../../public/Graph Diagram Animation.json";

const fetchUsers = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/all-users`);
  return res.data;
};

const HomeStatistic = () => {
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 0,
  });

  if (isLoading) return <Loading></Loading>;
  if (isError)
    return <div className="text-center py-10">Failed to load users.</div>;

  const totalUsers = users.length;
  const premiumUsers = users.filter((user) => user.premium).length;
  const normalUsers = totalUsers - premiumUsers;

  const stats = [
    {
      id: 1,
      label: "Total Users",
      count: totalUsers,
      icon: <Users size={70} className="text-[#004c4c]" />,
    },
    {
      id: 2,
      label: "Normal Users",
      count: normalUsers,
      icon: <User size={70} className="text-[#0F0F0F60]" />,
    },
    {
      id: 3,
      label: "Premium Users",
      count: premiumUsers,
      icon: <Star size={70} className="text-yellow-500" />,
    },
  ];

  return (
    <section className="max-w-8/12 mx-auto jakarta px-10 lg:px-0 pt-10">
      <div className="text-center flex flex-col gap-4 -mb-10">
        <h1 className="text-[38px] leading-12 lg:text-[40px] font-extrabold">
          User Statistics
        </h1>
        <p className="text-gray-700 max-w-[600px] mx-auto">
          See the growth and distribution of our platform users, including
          normal and premium subscribers.
        </p>
      </div>

      {/* 3 cards on left + Lottie on right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-2xl p-5 flex flex-col items-center border border-green-200 justify-center shadow hover:scale-105 transition cursor-pointer"
            >
              <div className="mb-2">{stat.icon}</div>
              <h1 className="text-[30px] lg:text-[40px] font-extrabold">
                <CountUp end={stat.count} duration={4} />
              </h1>
              <p className="text-lg font-semibold text-[#0F0F0F60]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Animation */}
        <div className="flex justify-center items-center">
          <Lottie
            animationData={Celebration}
            loop={true}
            className="w-[300px] lg:w-[450px]"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeStatistic;
