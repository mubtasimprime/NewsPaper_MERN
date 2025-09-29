import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const AddArticle = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const [publishers, setPublishers] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const { user } = useAuth();

  // Static tags
  const tagOptions = [
    { value: "politics", label: "Politics" },
    { value: "sports", label: "Sports" },
    { value: "tech", label: "Tech" },
    { value: "business", label: "Business" },
  ];

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/publishers`)
      .then((res) => setPublishers(res.data))
      .catch(() => toast.error("Failed to load publishers"));
  }, []);

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

  // Submit Article
  const onSubmit = async (data) => {
    if (!imageUrl) return toast.error("Please upload an image first");

    const article = {
      title: data.title,
      image: imageUrl,
      publisher: data.publisher,
      tags: data.tags, // already an array of values
      description: data.description,
      status: "pending",
      createdAt: new Date(),
      // declineReason: "",
      isPremium: "no",
      author: {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      },
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/articles`, article);
      toast.success("Article submitted! Waiting for admin approval.");
      reset();
      setImageUrl("");
    } catch {
      toast.error("Failed to submit article");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Article</h1>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              {...register("title", { required: true })}
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
              required
            />
            {uploading && (
              <p className="text-teal-600 text-sm mt-1">Uploading image...</p>
            )}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="mt-2 h-full w-full object-cover rounded-lg border"
              />
            )}
          </div>

          {/* Publisher Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Publisher</label>
            <select
              {...register("publisher", { required: true })}
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

          {/* Tags Multi Select */}
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <Controller
              name="tags"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  isMulti
                  options={tagOptions}
                  className="react-select-container"
                  required
                  classNamePrefix="react-select"
                  value={tagOptions.filter((option) =>
                    field.value?.includes(option.value)
                  )}
                  onChange={(val) =>
                    field.onChange(val.map((item) => item.value))
                  }
                />
              )}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Write article details..."
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!imageUrl || uploading}
            className="w-full bg-teal-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-teal-700 transition disabled:opacity-60"
          >
            Submit Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
