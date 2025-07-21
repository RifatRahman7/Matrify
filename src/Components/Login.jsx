import { Link } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 roboto">
      {/* Navbar */}
      <Navbar />

      {/* Login Form Section */}
      <div className="flex-grow flex items-center justify-center px-4 mt-10 mb-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Lottie Animation */}
          <div className="lg:block w-full">
            <img className="rounded-2xl" src="https://i.ibb.co/CpPDvgqh/login-image.jpg" alt="login image" />
          </div>

          {/* Login Form */}
          <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 transform transition-all duration-500 hover:shadow-gray-400">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to continue!</h2>

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
            <div className="mb-6">
              <label className="block text-gray-600 mb-1" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Login Button */}
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-300 cursor-pointer">
              Login
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-2 text-gray-500">OR</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            {/* Google Sign-In */}
            <button className="w-full border border-gray-300 hover:border-gray-500 text-gray-700 py-2 flex justify-center items-center rounded-lg transition duration-300 cursor-pointer">
              <FcGoogle className="mr-2 text-red-500" />
              Sign in with Google
            </button>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-green-600 hover:text-green-800 font-medium underline transition cursor-pointer"
              >
                Register Here
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

export default Login;
