import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Eye } from "lucide-react";
import useAuth from "../hooks/useAuth";

const AllArticlesPublic = () => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [publisherFilter, setPublisherFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch articles with filters
  const fetchArticles = async () => {
    const params = {};
    if (search) params.search = search;
    if (publisherFilter) params.publisher = publisherFilter;
    if (tagFilter) params.tags = tagFilter;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/public-articles`,
        { params }
      );
      setArticles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchArticles();
  }, []);

  // Check subscription
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/subscriptions/${user.email}`)
        .then((res) => setIsPremiumUser(res.data?.premium || false))
        .catch(() => setIsPremiumUser(false));
    }
  }, [user?.email]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Articles</h1>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 max-w-9/12 mx-auto">
        <input
          type="text"
          placeholder="Search by title"
          className="border px-4 py-2 rounded flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by publisher"
          className="border px-4 py-2 rounded flex-1"
          value={publisherFilter}
          onChange={(e) => setPublisherFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by tags (comma separated)"
          className="border px-4 py-2 rounded flex-1"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
        />
        <button
          onClick={fetchArticles}
          className="bg-[#004c4c] text-white px-4 py-2 rounded hover:bg-[#006666] transition"
        >
          Apply
        </button>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-9/12 mx-auto">
        {articles.map((article) => {
          const isPremiumArticle = article.isPremium;
          const isLocked = isPremiumArticle && !isPremiumUser;

          return (
            <div
              key={article._id}
              className={`relative rounded-xl shadow-md overflow-hidden flex flex-col transition transform hover:scale-[1.02]
                ${
                  isPremiumArticle
                    ? "border-4 border-yellow-500 bg-yellow-50"
                    : "bg-white"
                }
              `}
            >
              {/* Premium Badge */}
              {isPremiumArticle && (
                <div className="absolute top-0 left-0 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg shadow">
                  PREMIUM
                </div>
              )}

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

                {/* Tags */}
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

                {/* Views */}
                <div className="flex items-center gap-1 text-gray-600 mb-2">
                  <Eye size={18} />
                  <span>{article.viewCount || 0}</span>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-4">
                  {article.description}
                </p>

                {/* Details Button */}
                <button
                  onClick={() => navigate(`/article-details/${article._id}`)}
                  disabled={isLocked}
                  className={`mt-auto px-4 py-2 rounded transition
                    ${
                      isLocked
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-[#004c4c] hover:bg-[#006666] text-white"
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

export default AllArticlesPublic;
