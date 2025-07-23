import { Link } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 roboto">
      {/* Navbar */}
      <Navbar />

      {/* Register Section */}
      <div className="flex-grow flex items-center justify-center px-4 mt-10 mb-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left Side Image */}
          <div className="lg:block w-full max-w-md hidden lg:flex">
            <img
              className="rounded-2xl shadow-2xl object-cover w-full h-[420px] border border-white/40"
              src="https://i.ibb.co/CpPDvgqh/login-image.jpg"
              alt="register"
              style={{ filter: "blur(0.5px) brightness(0.95)" }}
            />
          </div>

          {/* Register Form */}
          <div className="w-full max-w-md bg-white/30 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-8 transition-all duration-500 hover:shadow-gray-400">
            <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-7 tracking-tight drop-shadow">
              Create your account
            </h2>

            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1 font-medium" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 bg-white/60 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1 font-medium" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-white/60 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1 font-medium" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-white/60 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>

            {/* Photo URL Input */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-1 font-medium" htmlFor="photo">
                Photo URL
              </label>
              <input
                id="photo"
                type="url"
                placeholder="Enter photo URL"
                className="w-full px-4 py-2 bg-white/60 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>

            {/* Register Button */}
            <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-2 rounded-lg shadow-lg transition duration-300 cursor-pointer">
              Register
            </button>

            {/* Divider */}
            <div className="flex items-center my-5">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-2 text-gray-500 font-medium">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            {/* Google Sign-In */}
            <button className="w-full border border-gray-300 hover:border-gray-500 bg-white/70 text-gray-700 py-2 flex justify-center items-center rounded-lg transition duration-300 cursor-pointer shadow">
              <FcGoogle className="text-2xl mr-2" />
              Sign in with Google
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-700 mt-7">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-700 hover:text-blue-700 font-semibold underline transition cursor-pointer"
              >
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Register;