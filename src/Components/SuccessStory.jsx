import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

const SuccessStory = () => {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        axios.get("https://matrify-server.vercel.app/success-stories")
            .then(res => {
                const sorted = res.data.sort(
                    (a, b) => new Date(b.marriageDate) - new Date(a.marriageDate)
                );
                setStories(sorted);
            });
    }, []);

    return (
        <div className="relative w-full max-w-5xl mx-auto py-12 roboto">
            <div
                className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-200/40 via-white/60 to-yellow-200/40 blur-xl rounded-3xl"
                style={{ filter: "blur(32px)" }}
            ></div>

            <div className="flex justify-center mb-8">
                <div className="bg-green-100/30 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 px-6 py-6 inline-block">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 m-0">
                        <Typewriter
                            words={['Matrify Success Stories']}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-5">
                {stories.map((story, idx) => (
                    <div
                        key={idx}
                        className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 p-6 flex flex-col items-center hover:scale-105 transition-transform duration-200"
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