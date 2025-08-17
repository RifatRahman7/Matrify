import React from "react";
import { FaStar } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

const reviews = [
  {
    name: "Arafat Islam",
    image: "https://i.ibb.co/zhFrNjqf/arafat.jpg",
    stars: 5,
    text: "Matrify made it so easy to find my soulmate. The platform is secure, modern, and user-friendly. Highly recommended!",
  },
  {
    name: "Sojib Islam",
    image: "https://i.ibb.co/C5m4p0Xf/sojib.jpg",
    stars: 4,
    text: "I loved the premium features and the support team was always helpful. Matrify is the best matrimony site in Bangladesh.",
  },
  {
    name: "Ayesha Akter",
    image: "https://i.ibb.co/p9Q5WT4/matrimony-1.png",
    stars: 5,
    text: "I met my husband through Matrify. The experience was smooth and safe. Thank you for changing my life!",
  },
];

const ReviewSection = () => (
  <div className="relative w-full max-w-5xl mx-auto py-12 roboto">
    {/* Blurred background */}
    <div
      className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-200/40 via-white/60 to-yellow-200/40 dark:from-slate-800/60 dark:via-slate-900/80 dark:to-slate-800/60 blur-xl rounded-3xl"
      style={{ filter: "blur(32px)" }}
    ></div>

    {/* Title */}
    <div className="flex justify-center mb-8">
      <div className="bg-white/30 dark:bg-slate-950/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 dark:border-slate-700 px-6 py-6 inline-block transition-colors duration-500">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 m-0">
          <Typewriter
            words={["What Our Users Say", "Users Review", "Matrify Experiences"]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h2>
      </div>
    </div>

    {/* Reviews */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-5">
      {reviews.map((review, idx) => (
        <div
          key={idx}
          className="bg-white/70 dark:bg-slate-950/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700 p-6 flex flex-col items-center hover:scale-105 transition-transform duration-200"
        >
          <img
            src={review.image}
            alt={review.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-green-200 dark:border-green-700 shadow mb-4"
          />
          <div className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">
            {review.name}
          </div>
          <div className="flex items-center mb-2">
            {[...Array(review.stars)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-xl" />
            ))}
          </div>
          <div className="text-gray-700 dark:text-gray-300 text-center italic mb-2">
            "{review.text}"
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ReviewSection;
