import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Typewriter } from "react-simple-typewriter";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const slides = [
  {
    title: "Find the One, Matrify the Bond.",
    description:
      "Discover genuine connections. Our platform brings tradition and technology together to help you find your perfect match.",
    image: "https://i.ibb.co/DgRBZnfX/matri-3.jpg"
  },
  {
    title: "Where Hearts Matrify.",
    description:
      "Begin your journey of love, trust, and companionship. We help you find a life partner who shares your values.",
    image: "https://i.ibb.co/yBfg5Y3y/matrify.jpg"
  },
  {
    title: "Connecting Souls, Building Futures.",
    description:
      "Experience seamless matchmaking with a community built on authenticity, respect, and cultural values.",
    image: "https://i.ibb.co/23jTXkGm/matri-5.webp"
  }
];

const BannerSlider = () => {
  return (
    <div className="roboto">
      <Swiper
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet custom-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active custom-bullet-active"
        }}
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="w-full h-[80vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Blurred background image */}
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  filter: "blur(6px) brightness(0.7)",
                }}
              />
              {/* Overlay gradient for extra readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10" />
              {/* Glassmorphism text box */}
              <div className="relative z-20 max-w-3xl mx-auto px-8 py-10 rounded-2xl bg-white/30 backdrop-blur-md shadow-2xl border border-white/30 text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-lg tracking-tight">
                  <Typewriter
                    words={[slide.title]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={80}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </h2>
                <p className="text-lg md:text-2xl text-white/90 font-medium drop-shadow">
                  <Typewriter
                    words={[slide.description]}
                    loop={0}
                    cursor
                    cursorStyle=""
                    typeSpeed={60}
                    deleteSpeed={40}
                    delaySpeed={2000}
                  />
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Swiper pagination styles */}
      <style jsx global>{`
        .custom-bullet {
          width: 14px;
          height: 14px;
          background: rgba(255,255,255,0.6);
          border-radius: 50%;
          margin: 0 6px !important;
          opacity: 1;
          border: 2px solid #fff;
          transition: background 0.3s, border 0.3s;
        }
        .custom-bullet-active {
          background: linear-gradient(90deg, #22c55e 0%, #2563eb 100%);
          border: 2px solid #fff;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
        }
        .swiper-pagination {
          bottom: 32px !important;
        }
      `}</style>
    </div>
  );
};

export default BannerSlider;