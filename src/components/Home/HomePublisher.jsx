import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../pages/shared/Loading";

const fetchPublishers = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/publishers`);
  return res.data;
};

const HomePublisher = () => {
  const {
    data: publishers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["publishers"],
    queryFn: fetchPublishers,
    staleTime: 1000 * 60 * 5, // 5 min cache
  });

  if (isLoading) return <Loading></Loading>;
  if (isError)
    return <div className="text-center py-10">Failed to load publishers.</div>;

  return (
    <div className="max-w-9/12 mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">All Publishers</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {publishers.map((publisher) => (
          <div
            key={publisher._id}
            className="flex flex-col items-center bg-white p-4 rounded-lg shadow hover:scale-105 transition cursor-pointer border border-green-300"
          >
            <img
              src={publisher.logo}
              alt={publisher.name}
              className="w-35 h-35 object-contain mb-2"
            />
            <span className="text-center text-sm font-medium">
              {publisher.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePublisher;
