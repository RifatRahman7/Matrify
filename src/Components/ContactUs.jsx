import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Phone } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-blue-50 roboto">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <section className="w-full max-w-4xl mx-auto bg-white/40 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-8 md:p-12">
          <div className="flex items-center justify-center mb-2">
            <span className="inline-flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-400 rounded-full p-3 shadow-lg mr-3">
              <Phone className="text-white w-7 h-7" />
            </span>
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight drop-shadow text-center">
              Contact Us
            </h1>
          </div>
          <p className="text-lg text-gray-700 mb-8 text-center">
            We’re here to help! Reach out to us for any queries, support, or feedback.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="flex flex-col gap-6">
              <div className="bg-white/80 backdrop-blur-xl rounded-xl hover:scale-105 transition  shadow-xl border border-white/40 p-6 flex items-center gap-4">
                <FaEnvelope className="text-2xl text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-700">support@matrify.com</p>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-xl hover:scale-105 transition shadow-xl border border-white/40 p-6 flex items-center gap-4">
                <FaPhoneAlt className="text-2xl text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-700">+880 1234 567890</p>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-xl hover:scale-105 transition border border-white/40 p-6 flex items-center gap-4">
                <FaMapMarkerAlt className="text-2xl text-pink-600" />
                <div>
                  <h3 className="font-semibold text-gray-800">Address</h3>
                  <p className="text-gray-700">Banani, Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <form className="bg-white/80 backdrop-blur-xl rounded-xl shadow-xl border border-white/40 p-8 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <FaUser className="text-lg text-green-600" />
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white/60 focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-lg text-blue-600" />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-lg text-green-600" />
                <input
                  type="text"
                  placeholder="Your Phone"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white/60 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="flex items-start gap-3">
                <FaEnvelope className="text-lg text-blue-600 mt-2" />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-2 cursor-pointer bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-2 rounded-lg shadow-lg transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;