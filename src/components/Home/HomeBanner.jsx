import { useNavigate } from "react-router";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../pages/shared/Loading";

const fetchArticles = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/public-articles`
  );
  return res.data;
};

const TrendingArticlesSlider = () => {
  const navigate = useNavigate();

  // Use React Query to fetch articles
  const {
    data: articles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <Loading></Loading>;
  if (isError)
    return <div className="text-center py-10">Failed to load articles.</div>;

  const trendingArticles = articles
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, 6);

  return (
    <div className="max-w-9/12 mx-auto py-10">
      <Swiper
        className="h-[50vh] overflow-hidden"
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {trendingArticles.map((article) => (
          <SwiperSlide key={article._id}>
            <div
              className="relative w-full h-full cursor-pointer overflow-hidden rounded-xl shadow-md"
              onClick={() => navigate(`/article-details/${article._id}`)}
            >
              <img
                className="w-full h-full object-cover"
                src={article.image}
                alt={article.title}
              />
              {/* <div className="absolute inset-0 bg-black/10"></div> */}
              <div className="absolute bottom-0 left-0 w-full text-white p-6 text-center bg-black/60">
                <h3 className="text-lg font-semibold line-clamp-2">
                  {article.title}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingArticlesSlider;
