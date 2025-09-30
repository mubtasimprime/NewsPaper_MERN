import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Loading from "./shared/Loading";

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const incrementedRef = useRef(false);

  useEffect(() => {
    if (!incrementedRef.current) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/public-articles/${id}`)
        .then((res) => setArticle(res.data))
        .catch((err) => console.error(err));
      incrementedRef.current = true;
    }
  }, [id]);

  if (!article) return <Loading></Loading>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <p className="text-gray-500 mb-2">Publisher: {article.publisher}</p>
        <p className="text-gray-500 mb-4">Views: {article.viewCount || 0}</p>
        <img
          src={article.image}
          alt={article.title}
          className="w-full mb-4 rounded"
        />
        <p className="text-gray-700">{article.description}</p>
      </div>
    </div>
  );
};

export default ArticleDetails;
