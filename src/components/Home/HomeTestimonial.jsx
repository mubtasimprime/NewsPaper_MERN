import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const HomeTestimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const feedbacks = [
    {
      _id: 1,
      readerImg: "https://i.ibb.co.com/cSQky5Vf/Screenshot-10.png",
      readerName: "Sajid Rahman",
      readerEmail: "sajid@gmail.com",
      rating: 5,
      description:
        "I enjoy the in-depth coverage of current events. Your articles keep me well-informed every day.",
    },
    {
      _id: 2,
      readerImg: "https://i.ibb.co.com/fzhzd1cX/Screenshot-12.png",
      readerName: "Sumon Sheikh",
      readerEmail: "sumon@gmail.com",
      rating: 4,
      description:
        "The editorial pieces are insightful and balanced. I particularly appreciate the local news coverage.",
    },
    {
      _id: 3,
      readerImg: "https://i.ibb.co.com/6Rgp6qhC/Screenshot-11.png",
      readerName: "Mashiur Rahman",
      readerEmail: "mashiur@gmail.com",
      rating: 5,
      description:
        "I love the investigative journalism section. It provides clarity on complex issues in a simple way.",
    },
    {
      _id: 4,
      readerImg:
        "https://i.ibb.co.com/HpfrPZ5r/Gemini-Generated-Image-dre35wdre35wdre3.png",
      readerName: "Md. Mubtasim Fuad",
      readerEmail: "fuad@gmail.com",
      rating: 3,
      description:
        "Good coverage overall, but I wish there were more opinion pieces on international topics.",
    },
    {
      _id: 5,
      readerImg: "https://i.ibb.co.com/4bjD5Wj/Anis.png",
      readerName: "Anisur Rahman",
      readerEmail: "anisur@gmail.com",
      rating: 5,
      description:
        "Absolutely fantastic! The newspaper delivers news promptly and accurately every day.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 relative">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        What Students Are Saying
      </h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[Autoplay, Navigation]}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 15 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        navigation
      >
        {feedbacks.map((feedback, index) => (
          <SwiperSlide key={feedback._id}>
            <div
              className={`transition-all duration-300 ease-in-out 
                p-6 rounded-lg shadow-lg text-center 
                bg-[#b2d8d8]
                ${index === activeIndex ? "" : "blur-sm opacity-50 scale-90"}`}
            >
              <img
                src={feedback.readerImg}
                alt={feedback.readerName}
                className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-green-500"
              />

              <Rating
                value={feedback.rating}
                readOnly
                style={{ maxWidth: 150, margin: "0 auto" }}
              />

              <p className="text-gray-800 mt-4 text-lg italic">
                "{feedback.description}"
              </p>

              <p className="text-sm text-gray-700 mt-2">
                — {feedback.readerName} <br />
                <span className="text-gray-500">{feedback.readerEmail}</span>
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeTestimonial;
