import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaUsers, FaHeart, FaUserTie } from "react-icons/fa";

const team = [
  {
    name: "Ayesha Rahman",
    role: "Co-Founder & CEO",
    img: "https://i.ibb.co/7dHR0rjW/aysha-img.jpg",
  },
  {
    name: "Tanvir Ahmed",
    role: "Lead Developer",
    img: "https://i.ibb.co/0pFBMxRQ/tan-img.jpg",
  },
  {
    name: "Priya Sultana",
    role: "Community Manager",
    img: "https://i.ibb.co/PZTPSyr7/priya-img.jpg",
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-blue-50 roboto">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <section className="w-full max-w-3xl mx-auto bg-white/40 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-8 md:p-12 text-center">
          <h1 className="text-4xl md:text-4xl font-extrabold text-gray-800 mb-4 tracking-tight drop-shadow">
            About Matrify
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Matrify is a modern matrimony platform built with the powerful MERN stack, designed to help you find your perfect life partner in a safe, respectful, and user-friendly environment.
          </p>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-8">
            <img
              src="https://i.ibb.co/p9Q5WT4/matrimony-1.png"
              alt="Matrify Logo"
              className="w-28 h-28 rounded-full shadow-lg border-4 border-white/60 mx-auto"
            />
            <div className="text-left md:text-left">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Our Mission</h2>
              <p className="text-gray-700">
                To connect hearts and families by blending tradition with technology. We believe in genuine connections, privacy, and a seamless experience for everyone seeking a meaningful relationship.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-8">
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-7 shadow-2xl border border-white/50 hover:shadow-3xl hover:scale-105 transition-all duration-300 group">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-400 to-blue-400 p-3 rounded-full shadow-lg">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2 mt-4 text-center">Why Choose Matrify?</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
                <li>Secure and private user profiles</li>
                <li>Advanced search and matching algorithms</li>
                <li>Easy-to-use, elegant interface</li>
                <li>Respect for cultural values and preferences</li>
                <li>Active support and guidance</li>
              </ul>
            </div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-7 shadow-2xl border border-white/50 hover:scale-105  hover:shadow-3xl transition-all duration-300 group">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-400 to-blue-400 p-3 rounded-full shadow-lg">
                <FaHeart className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-green-700 mb-2 mt-4 text-center">Our Values</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
                <li>Authenticity and trust</li>
                <li>Respect and inclusivity</li>
                <li>Privacy and safety</li>
                <li>Continuous improvement</li>
                <li>Celebrating every union</li>
              </ul>
            </div>
          </div>
          {/* Divider with icon */}
          <div className="flex items-center justify-center my-12">
            <span className="h-px w-16 bg-gradient-to-r from-green-400 to-blue-400"></span>
            <FaUserTie className="mx-4 text-3xl text-green-600 drop-shadow" />
            <span className="h-px w-16 bg-gradient-to-l from-green-400 to-blue-400"></span>
          </div>
          {/* Team Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Meet Our Team</h3>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              {team.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-white/70 backdrop-blur-lg rounded-xl hover:scale-105  shadow-2xl border border-white/40 p-5 flex flex-col items-center w-60 hover:shadow-2xl transition"
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-green-200 shadow mb-3"
                  />
                  <h4 className="text-lg font-semibold text-gray-800">{member.name}</h4>
                  <p className="text-green-700 font-medium">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Join Us On Your Journey</h3>
            <p className="text-gray-700">
              Whether you’re searching for your soulmate or helping a loved one find theirs, Matrify is here to support you every step of the way. <br />
              <span className="text-green-700 font-semibold">Start your story with us today.</span>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;