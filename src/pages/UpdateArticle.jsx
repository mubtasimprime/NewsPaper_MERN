import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publisher, setPublisher] = useState("");
  const [tags, setTags] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Static tag options
  const tagOptions = [
    { value: "politics", label: "Politics" },
    { value: "sports", label: "Sports" },
    { value: "tech", label: "Tech" },
    { value: "business", label: "Business" },
    { value: "environment", label: "Environment" },
    { value: "education", label: "Education" },
    { value: "innovation", label: "Innovation" },
    { value: "energy", label: "Energy" },
    { value: "transport", label: "Transport" },
    { value: "health", label: "Health" },
    { value: "agriculture", label: "Agriculture" },
    { value: "weather", label: "Weather" },
    { value: "culture", label: "Culture" },
    { value: "art", label: "Art" },
  ];

  // Fetch publishers for dropdown
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/publishers`)
      .then((res) => setPublishers(res.data))
      .catch(() => toast.error("Failed to load publishers"));
  }, []);

  // Fetch article data
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/articles/${id}`
        );
        const article = res.data;
        setTitle(article.title || "");
        setDescription(article.description || "");
        setPublisher(article.publisher || "");
        setTags(article.tags || []);
        setImageUrl(article.image || "");
      } catch (err) {
        console.error(err);
        toast.error("Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchArticle();
  }, [id]);

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const url = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_upload_key
      }`;
      const res = await axios.post(url, formData);
      setImageUrl(res.data.data.url);
      toast.success("Image uploaded");
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !publisher || tags.length === 0)
      return toast.error("Please fill all fields");

    const updatedArticle = {
      title,
      description,
      publisher,
      tags,
      image: imageUrl,
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/articles/${id}`,
        updatedArticle
      );
      toast.success("Article updated successfully");
      navigate("/my-articles");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update article");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading article...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Update Article</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Enter article title"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 cursor-pointer"
            />
            {uploading && (
              <p className="text-teal-600 text-sm mt-1">Uploading image...</p>
            )}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="mt-2 h-48 w-full object-cover rounded-lg border"
              />
            )}
          </div>

          {/* Publisher Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Publisher</label>
            <select
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              required
            >
              <option value="">Select publisher</option>
              {publishers.map((p) => (
                <option key={p._id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags Multi-select */}
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <Select
              isMulti
              options={tagOptions}
              value={tagOptions.filter((o) => tags.includes(o.value))}
              onChange={(selected) => setTags(selected.map((s) => s.value))}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Write article details..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-teal-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-teal-700 transition disabled:opacity-60"
          >
            Update Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateArticle;
