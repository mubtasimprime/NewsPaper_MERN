import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddPublisher = () => {
  const [name, setName] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !logoFile) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);

    try {
      // 1. Upload image to Imgbb
      const formData = new FormData();
      formData.append("image", logoFile);

      const imageUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_upload_key
      }`;
      const res = await axios.post(imageUrl, formData);
      const logoUrl = res.data.data.url;

      // 2. Send publisher data to backend
      const publisherData = { name, logo: logoUrl };
      await axios.post(
        `${import.meta.env.VITE_API_URL}/publishers`,
        publisherData
      );

      // Success toast and reset form
      toast.success("Publisher added successfully!");
      setName("");
      setLogoFile(null);
      if (fileInputRef.current) fileInputRef.current.value = ""; // reset file input
    } catch (error) {
      console.error(error);
      toast.error("Failed to add publisher");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-5 bg-white shadow-md rounded md:mt-10">
      <h2 className="text-2xl font-bold mb-4">Add Publisher</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Publisher Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded border-green-200"
          required
        />

        <input
          className="border p-2 rounded border-green-200"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => setLogoFile(e.target.files[0])}
          required
        />

        <button
          type="submit"
          className="bg-[#004c4c] hover:bg-[#006666] text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Publisher"}
        </button>
      </form>
    </div>
  );
};

export default AddPublisher;
