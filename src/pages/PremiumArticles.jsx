import { useNavigate } from "react-router";
import { Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const PremiumArticles = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: articles = [] } = useQuery({
    queryKey: ["premium-articles"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/premium-articles`
      );
      return res.data;
    },
  });

  const { data: subscription } = useQuery({
    queryKey: ["subscription", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/subscriptions/${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const isPremiumUser = subscription?.premium || false;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4 text-center">
        Premium Articles ⭐
      </h1>
      <p className="text-gray-600 text-lg max-w-4xl mx-auto text-center mb-6">
        Unlock exclusive access to in-depth articles, expert insights, and
        high-quality content available only to premium members. Stay ahead with
        carefully curated information designed to provide greater value and a
        deeper understanding of your interests.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-9/12 mx-auto">
        {articles.map((article) => {
          const isLocked = !isPremiumUser;

          return (
            <div
              key={article._id}
              className="relative rounded-xl shadow-md overflow-hidden flex flex-col border-4 border-yellow-500 bg-yellow-50 transition transform hover:scale-[1.02]"
            >
              <div className="absolute top-0 left-0 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg shadow">
                PREMIUM
              </div>

              <img
                src={article.image}
                alt={article.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-500 mb-2">
                  Publisher: {article.publisher}
                </p>

                <div className="flex flex-wrap gap-2 mb-2">
                  {article.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-gray-600 mb-2">
                  <Eye size={18} />
                  <span>{article.viewCount || 0}</span>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-4">
                  {article.description}
                </p>

                <button
                  onClick={() => navigate(`/article-details/${article._id}`)}
                  disabled={isLocked}
                  className={`mt-auto px-4 py-2 rounded transition
                    ${
                      isLocked
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-yellow-600 hover:bg-yellow-700 text-white"
                    }
                  `}
                >
                  {isLocked ? "Subscribe to Unlock" : "Details"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PremiumArticles;
