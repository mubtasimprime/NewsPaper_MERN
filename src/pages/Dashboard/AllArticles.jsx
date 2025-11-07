import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDelete,
} from "react-icons/ai";
import { MdStars } from "react-icons/md";
import Loading from "../shared/Loading";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  // Decline modal
  const [openModal, setOpenModal] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // Fetch articles
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

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = articles.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
      {
        reason: declineReason,
      }
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
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-4 text-center md:text-start">
        All Articles
      </h1>

      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-lg shadow">
            <table className="table table-zebra w-full text-sm">
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
                {paginatedArticles.map((a, idx) => (
                  <tr key={a._id}>
                    <td>{startIndex + idx + 1}</td>
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
                      {a.isPremium && a.status === "approved" ? (
                        <span className="badge badge-info">Premium</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="flex gap-1">
                      {a.status === "pending" && (
                        <>
                          <button
                            className="btn btn-xs btn-success"
                            title="Approve"
                            onClick={() => approveArticle(a._id)}
                          >
                            <AiOutlineCheck />
                          </button>
                          <button
                            className="btn btn-xs btn-error"
                            title="Decline"
                            onClick={() => openDecline(a._id)}
                          >
                            <AiOutlineClose />
                          </button>
                        </>
                      )}
                      {a.status === "approved" && !a.isPremium && (
                        <button
                          className="btn btn-xs btn-warning"
                          title="Make Premium"
                          onClick={() => makePremium(a._id)}
                        >
                          <MdStars />
                        </button>
                      )}
                      <button
                        className="btn btn-xs btn-outline btn-error"
                        title="Delete"
                        onClick={() => deleteArticle(a._id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid gap-4 md:hidden pt-5">
            {paginatedArticles.map((a) => (
              <div
                key={a._id}
                className="bg-white shadow rounded-lg p-4 space-y-2 border border-green-100"
              >
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img
                        src={
                          a.author?.photo ||
                          "https://i.ibb.co/4pDNDk1/avatar.png"
                        }
                        alt={a.author?.name}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">{a.author?.name || "—"}</p>
                    <p className="text-xs text-gray-500">{a.author?.email}</p>
                  </div>
                </div>

                <p className="font-medium">{a.title}</p>
                <p className="text-xs text-gray-500">
                  {new Date(a.createdAt).toLocaleString()}
                </p>

                <p>
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
                </p>

                <p className="text-sm">
                  <span className="font-semibold">Publisher:</span>{" "}
                  {a.publisher}
                </p>

                {a.isPremium && a.status === "approved" && (
                  <p>
                    <span className="badge badge-info">Premium</span>
                  </p>
                )}

                {/* Actions */}
                <div className="flex flex-col md:flex-row gap-2 pt-2">
                  {a.status === "pending" && (
                    <>
                      <button
                        className="btn btn-xs btn-success w-full md:w-auto"
                        title="Approve"
                        onClick={() => approveArticle(a._id)}
                      >
                        <AiOutlineCheck />
                      </button>
                      <button
                        className="btn btn-xs btn-error w-full md:w-auto"
                        title="Decline"
                        onClick={() => openDecline(a._id)}
                      >
                        <AiOutlineClose />
                      </button>
                    </>
                  )}
                  {a.status === "approved" && !a.isPremium && (
                    <button
                      className="btn btn-xs btn-warning w-full md:w-auto"
                      title="Make Premium"
                      onClick={() => makePremium(a._id)}
                    >
                      <MdStars />
                    </button>
                  )}
                  <button
                    className="btn btn-xs btn-outline btn-error w-full md:w-auto"
                    title="Delete"
                    onClick={() => deleteArticle(a._id)}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {articles.length > itemsPerPage && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                className="btn btn-sm"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`btn btn-sm ${
                    currentPage === idx + 1 ? "btn-primary" : "btn-outline"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                className="btn btn-sm"
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
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
