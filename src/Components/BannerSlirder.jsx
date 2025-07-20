import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Typewriter } from "react-simple-typewriter";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules"; 

const slides = [
  {
    title: "Find the One. Matrify the Bond.",
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
    image: "https://i.ibb.co/1fVvvjHY/matri-4.webp"
  }
];

const BannerSlider = () => {
  return (
    <div className="roboto">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]} 
        loop={true}
        autoplay={{
          delay: 3000, 
          disableOnInteraction: false,
        }}
        className="w-full h-[80vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="bg-opacity-60 p-8 rounded-lg max-w-3xl text-center text-gray-600">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <Typewriter
                    words={[slide.title]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={100}
                    deleteSpeed={60}
                    delaySpeed={2000}
                  />
                </h2>
                <p className="text-lg md:text-xl">
                  <Typewriter
                    words={[slide.description]}
                    loop={0}
                    cursor
                    cursorStyle=""
                    typeSpeed={100}
                    deleteSpeed={60}
                    delaySpeed={2000}
                  />
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
