import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  // For decline modal
  const [openModal, setOpenModal] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // Load all articles
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/articles`);
      setArticles(res.data);
    } catch {
      toast.error("Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // === ACTIONS ===
  const approveArticle = async (id) => {
    await axios.patch(`${import.meta.env.VITE_API_URL}/articles/${id}/approve`);
    toast.success("Article approved");
    fetchArticles();
  };

  const openDecline = (id) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const submitDecline = async () => {
    if (!declineReason.trim()) return toast.error("Reason required");
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/articles/${selectedId}/decline`,
      { reason: declineReason }
    );
    toast.info("Article declined");
    setOpenModal(false);
    setDeclineReason("");
    fetchArticles();
  };

  const makePremium = async (id) => {
    await axios.patch(`${import.meta.env.VITE_API_URL}/articles/${id}/premium`);
    toast.success("Marked as premium");
    fetchArticles();
  };

  const deleteArticle = async (id) => {
    if (!confirm("Delete this article?")) return;
    await axios.delete(`${import.meta.env.VITE_API_URL}/articles/${id}`);
    toast.success("Article deleted");
    fetchArticles();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Articles</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Profile</th>
                <th>Author</th>
                <th>Email</th>
                <th>Title</th>
                <th>Posted</th>
                <th>Status</th>
                <th>Publisher</th>
                <th>Premium</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a, idx) => (
                <tr key={a._id}>
                  <td>{idx + 1}</td>
                  <td>
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img
                          src={
                            a.author?.photo ||
                            "https://i.ibb.co/4pDNDk1/avatar.png"
                          }
                          alt={a.author?.name}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{a.author?.name || "—"}</td>
                  <td>{a.author?.email || "—"}</td>
                  <td className="font-medium">{a.title}</td>
                  <td>{new Date(a.createdAt).toLocaleString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        a.status === "approved"
                          ? "badge-success"
                          : a.status === "declined"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td>{a.publisher}</td>
                  <td>
                    {a.isPremium ? (
                      <span className="badge badge-info w-full">Premium</span>
                    ) : (
                      <span className="badge bg-red-400 w-full">No</span>
                    )}
                  </td>
                  <td className="space-x-2">
                    {a.status === "pending" && (
                      <>
                        <button
                          className="btn btn-xs btn-success"
                          onClick={() => approveArticle(a._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-xs btn-error"
                          onClick={() => openDecline(a._id)}
                        >
                          Decline
                        </button>
                      </>
                    )}
                    {a.status === "approved" && !a.isPremium && (
                      <button
                        className="btn btn-xs btn-warning"
                        onClick={() => makePremium(a._id)}
                      >
                        Make Premium
                      </button>
                    )}
                    <button
                      className="btn btn-xs btn-outline btn-error"
                      onClick={() => deleteArticle(a._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Decline Modal */}
      {openModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">Decline Article</h3>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Enter reason for decline"
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
            />
            <div className="modal-action">
              <button className="btn btn-error" onClick={submitDecline}>
                Submit
              </button>
              <button
                className="btn"
                onClick={() => {
                  setOpenModal(false);
                  setDeclineReason("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllArticles;
