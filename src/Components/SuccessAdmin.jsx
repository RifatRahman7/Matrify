import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const SuccessAdmin = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get("https://matrify-server.vercel.app/success-stories")
      .then(res => setStories(res.data));
  }, []);

  const getMaleId = (story) => story.selfBiodataId;
  const getFemaleId = (story) => story.partnerBiodataId;

  const handleViewStory = (story) => {
    Swal.fire({
      title: "Success Story",
      html: `
        <img src="${story.coupleImage || "https://i.ibb.co/p9Q5WT4/matrimony-1.png"}" alt="Couple" style="width:90px;height:90px;border-radius:50%;margin-bottom:10px;object-fit:cover;border:3px solid #f472b6;box-shadow:0 2px 8px #0001;">
        <div style="margin-bottom:8px;color:#666;font-size:15px;">Married on: ${story.marriageDate ? new Date(story.marriageDate).toLocaleDateString() : "N/A"}</div>
        <div style="margin-bottom:8px;">
          ${[...Array(story.reviewStar || 5)].map(() => "⭐").join(" ")}
        </div>
        <div style="color:#444;font-size:16px;font-style:italic;">"${story.successText}"</div>
      `,
      showCloseButton: true,
      showConfirmButton: false,
      width: 400,
      background: "rgba(255,255,255,0.95)",
      customClass: {
        popup: "rounded-2xl shadow-2xl"
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-10 roboto">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
        All Success Stories
      </h2>
      {/* Table for md and up */}
      <div className="overflow-x-auto bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 p-6 hidden md:block">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-green-100 to-blue-100">
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Male Biodata ID</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">Female Biodata ID</th>
              <th className="px-4 py-2 text-center font-semibold text-gray-700">View Story</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story, idx) => (
              <tr key={idx} className="hover:bg-blue-50 transition">
                <td className="px-4 py-2">{getMaleId(story)}</td>
                <td className="px-4 py-2">{getFemaleId(story)}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleViewStory(story)}
                    className="px-4 cursor-pointer py-1 rounded bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold hover:from-pink-600 hover:to-yellow-600 transition"
                  >
                    View Story
                  </button>
                </td>
              </tr>
            ))}
            {stories.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-8 text-gray-500">No success stories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Card system for small devices */}
      <div className="block md:hidden space-y-4">
        {stories.length === 0 && (
          <div className="text-center py-8 text-gray-500 bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30">
            No success stories found.
          </div>
        )}
        {stories.map((story, idx) => (
          <div
            key={idx}
            className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 p-5 flex flex-col gap-2"
          >
            <div className="flex items-center gap-4 mb-2">
              <img
                src={story.coupleImage || "https://i.ibb.co/p9Q5WT4/matrimony-1.png"}
                alt="Couple"
                className="w-14 h-14 rounded-full object-cover border-2 border-pink-300 shadow"
              />
              <div>
                <div className="font-semibold text-gray-800">Male Biodata ID: <span className="font-mono">{getMaleId(story)}</span></div>
                <div className="font-semibold text-gray-800">Female Biodata ID: <span className="font-mono">{getFemaleId(story)}</span></div>
              </div>
            </div>
            <button
              onClick={() => handleViewStory(story)}
              className="w-full mt-2 cursor-pointer px-4 py-2 rounded bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold hover:from-pink-600 hover:to-yellow-600 transition"
            >
              View Story
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessAdmin;