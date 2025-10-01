import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";

const fetchArticles = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/articles`);
  if (!res.ok) throw new Error("Failed to fetch articles");
  return res.json();
};

const MyArticles = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [declineReason, setDeclineReason] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Fetch articles after user is loaded
  const {
    data: allArticles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
    enabled: !!user,
  });

  if (authLoading) return <p className="text-center mt-10">Loading user...</p>;
  if (isLoading)
    return <p className="text-center mt-10">Loading articles...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load articles.</p>
    );

  // Filter articles for logged-in user
  const articles = allArticles.filter(
    (article) => article.author?.email === user?.email
  );

  if (!articles.length)
    return <p className="text-center mt-10">No articles found.</p>;

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/articles/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to delete article");

      // React Query refetch
      alert("Article deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete article");
    }
  };

  return (
    <div className="p-6 min-h-[calc(100vh-64px)] max-w-9/12 mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4 text-center">
        My Articles
      </h1>
      <p className="text-gray-600 text-lg max-w-4xl mx-auto mb-6">
        Here you can view all the articles you have created, manage their
        status, and make updates or deletions as needed. Stay organized and keep
        track of which articles are approved, pending, or declined.
      </p>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Details</th>
              <th>Status</th>
              <th>Premium</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, idx) => (
              <tr key={article._id}>
                <th>{idx + 1}</th>
                <td>{article.title}</td>

                {/* Details Button */}
                <td>
                  <button
                    className={`btn btn-sm btn-primary ${
                      article.status !== "approved" ? "btn-disabled" : ""
                    }`}
                    onClick={() => navigate(`/article-details/${article._id}`)}
                    disabled={article.status !== "approved"}
                  >
                    Details
                  </button>
                </td>

                {/* Status */}
                <td>
                  {article.status === "declined" ? (
                    <div className="flex items-center gap-2">
                      <span className="text-red-600 font-semibold">
                        Declined
                      </span>
                      <button
                        className="btn btn-xs btn-info"
                        onClick={() => {
                          setDeclineReason(
                            article.declineReason || "No reason provided"
                          );
                          setShowModal(true);
                        }}
                      >
                        View Reason
                      </button>
                    </div>
                  ) : (
                    <span
                      className={
                        article.status === "approved"
                          ? "text-green-600 font-semibold"
                          : "text-yellow-500 font-semibold"
                      }
                    >
                      {article.status}
                    </span>
                  )}
                </td>

                {/* Premium */}
                <td>{article.isPremium ? "Yes" : "No"}</td>

                {/* Actions */}
                <td className="flex gap-2">
                  <button
                    className={`btn btn-sm btn-warning ${
                      article.status !== "approved" ? "btn-disabled" : ""
                    }`}
                    onClick={() => navigate(`/articles/update/${article._id}`)}
                    disabled={article.status !== "approved"}
                  >
                    Update
                  </button>

                  <button
                    className={`btn btn-sm btn-error ${
                      article.status !== "approved" ? "btn-disabled" : ""
                    }`}
                    onClick={() => handleDelete(article._id)}
                    disabled={article.status !== "approved"}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decline Reason Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Decline Reason</h3>
            <p>{declineReason}</p>
            <div className="modal-action">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyArticles;
