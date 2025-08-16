import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    question: "How do I create a biodata on Matrify?",
    answer:
      "Simply register for free, go to your dashboard, and fill out the biodata form with your details. You can edit and update it anytime.",
  },
  {
    question: "Is Matrify safe and secure?",
    answer:
      "Yes! We use verification, secure payments, and manual profile checks to keep Matrify safe for everyone.",
  },
  {
    question: "How do I become a premium member?",
    answer:
      "Go to your dashboard, click 'Make Biodata Premium', and follow the steps. After admin approval, you’ll enjoy premium features.",
  },
  {
    question: "Can I contact other members directly?",
    answer:
      "Premium members can view contact information. Normal users can request contact info by paying a small fee.",
  },
  {
    question: "How do I share my marriage success story?",
    answer:
      "After getting married, visit the 'Got Married' section in your dashboard and submit your story. Inspire others with your journey!",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto py-6 my-6 roboto p-5">
      {/* Blurred background */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-200/40 via-white/60 to-green-200/40 blur-xl rounded-3xl"
        style={{ filter: "blur(32px)" }}
      ></div>
      {/* Glassmorphism card */}
      <div className="w-full bg-white/40 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 px-8 py-12">
        <div className="flex flex-col items-center mb-8">
          <FaQuestionCircle className="text-blue-500 text-5xl mb-2 drop-shadow" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-2 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-700 text-center text-lg md:text-xl">
            Everything you need to know about Matrify.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white/60 border border-white/30 rounded-xl shadow flex flex-col transition"
            >
              <button
                onClick={() => toggle(idx)}
                className="flex items-center justify-between w-full px-6 py-4 text-left focus:outline-none"
              >
                <span className="font-semibold text-gray-800 text-lg flex items-center gap-2">
                  <FaQuestionCircle className="text-green-500" />
                  {faq.question}
                </span>
                {openIndex === idx ? (
                  <FaChevronUp className="text-green-500 text-xl cursor-pointer" />
                ) : (
                  <FaChevronDown className="text-gray-400 text-xl cursor-pointer" />
                )}
              </button>
              <div
                className={`px-6 pb-4 text-gray-700 text-base transition-all duration-300 ${
                  openIndex === idx
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;