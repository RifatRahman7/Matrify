import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const SuccessStory = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/success-stories")
      .then(res => {
        // Sort by marriageDate descending (newest first)
        const sorted = res.data.sort(
          (a, b) => new Date(b.marriageDate) - new Date(a.marriageDate)
        );
        setStories(sorted);
      });
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
        Matrify Success Stories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {stories.map((story, idx) => (
          <div
            key={idx}
            className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 p-6 flex flex-col items-center"
          >
            <img
              src={story.coupleImage || "https://i.ibb.co/p9Q5WT4/matrimony-1.png"}
              alt="Couple"
              className="w-24 h-24 rounded-full object-cover border-4 border-pink-300 shadow mb-4"
            />
            <div className="text-lg font-bold text-gray-800 mb-1">
              {story.marriageDate && (
                <span className="block text-sm text-gray-500 mb-1">
                  Married on: {new Date(story.marriageDate).toLocaleDateString()}
                </span>
              )}
            </div>
            <div className="flex items-center mb-2">
              {[...Array(story.reviewStar || 5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-xl" />
              ))}
            </div>
            <div className="text-gray-700 text-center italic mb-2">
              "{story.successText}"
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStory;