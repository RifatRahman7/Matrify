import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

const SuccessStory = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get("https://matrify-server.vercel.app/success-stories").then((res) => {
      const sorted = res.data.sort(
        (a, b) => new Date(b.marriageDate) - new Date(a.marriageDate)
      );
      setStories(sorted);
    });
  }, []);

  return (
    <section
      className="relative w-full max-w-5xl mx-auto py-12
      dark:bg-none dark:bg-slate-950"
    >
      {/* Light-mode blurred gradient */}
      <div
        className="absolute inset-0 -z-10 blur-xl rounded-3xl dark:hidden"
        style={{ filter: "blur(32px)" }}
      ></div>

      {/* Header */}
      <div className="flex justify-center mb-8">
        <div
          className="bg-green-100/30 dark:bg-slate-900/80 backdrop-blur-lg
          rounded-2xl shadow-xl border border-white/30 dark:border-slate-700
          px-6 py-6 inline-block"
        >
          <h2 className="text-2xl md:text-2xl font-bold text-center text-gray-800 dark:text-gray-100 m-0">
            <Typewriter
              words={["Matrify Success Stories"]}
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

      {/* Stories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-5">
        {stories.map((story, idx) => (
          <div
            key={idx}
            className="bg-white/70 dark:bg-slate-900/80 backdrop-blur-lg
              rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700
              p-6 flex flex-col items-center
              hover:scale-105 transition-transform duration-200"
          >
            <img
              src={
                story.coupleImage ||
                "https://i.ibb.co/p9Q5WT4/matrimony-1.png"
              }
              alt="Couple"
              className="w-24 h-24 rounded-full object-cover border-4 border-pink-300 shadow mb-4"
            />
            <div className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">
              {story.marriageDate && (
                <span className="block text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Married on:{" "}
                  {new Date(story.marriageDate).toLocaleDateString()}
                </span>
              )}
            </div>
            <div className="flex items-center mb-2">
              {[...Array(story.reviewStar || 5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-xl" />
              ))}
            </div>
            <div className="text-gray-700 dark:text-gray-300 text-center italic mb-2">
              "{story.successText}"
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStory;
