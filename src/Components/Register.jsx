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
          <div className="lg:block w-full">
            <img
              className="rounded-2xl"
              src="https://i.ibb.co/CpPDvgqh/login-image.jpg" // Use any relevant registration image
              alt="register"
            />
          </div>

          {/* Register Form */}
          <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 transform transition-all duration-500 hover:shadow-gray-400">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create your account</h2>

            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-1" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-1" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Photo URL Input */}
            <div className="mb-6">
              <label className="block text-gray-600 mb-1" htmlFor="photo">Photo URL</label>
              <input
                id="photo"
                type="url"
                placeholder="Enter photo URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Register Button */}
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-300 cursor-pointer">
              Register
            </button>
            {/* Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-2 text-gray-500">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
            {/* Google Sign-In */}
                        <button className="w-full border border-gray-300 hover:border-gray-500 text-gray-700 py-2 flex justify-center items-center rounded-lg transition duration-300 cursor-pointer">
                          <FcGoogle className="text-2xl mr-2" />
                          Sign in with Google
                        </button>
            

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-600 hover:text-green-800 font-medium underline transition cursor-pointer"
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
