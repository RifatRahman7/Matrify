import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import Swal from 'sweetalert2';
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const result = await signIn(email, password);
      const user = result.user;
      Swal.fire({
        title: 'Login Successful!',
        text: `Welcome ${user?.displayName || "Back"}!`,
        icon: 'success',
        confirmButtonColor: '#16a34a',
        confirmButtonText: 'OK'
      });
      setTimeout(() => {
        navigate(location.state?.from || "/", { replace: true });
      }, 500);
    } catch (err) {
      setErrorMsg("Invalid email or password. Please try again.");
      toast.error("Login failed: " + err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await googleSignIn(provider);
      const user = result.user;

      await axios.post("https://matrify-server.vercel.app/users", {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });

      Swal.fire({
        title: 'Login Successful!',
        text: `Logged in with Google as ${user?.displayName}`,
        icon: 'success',
        confirmButtonColor: '#16a34a',
        confirmButtonText: 'OK'
      });
      setTimeout(() => {
        navigate(location.state?.from || "/", { replace: true });
      }, 500);
    } catch (err) {
      setErrorMsg("Google login failed.");
      toast.error("Google Login Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg dark:bg-slate-950 dark:text-gray-100 roboto">
      <ToastContainer theme="colored" />
      
      {/* Navbar */}
      <Navbar />

      {/* Login Form Section */}
      <div className="flex-grow flex items-center justify-center px-4 mt-10 mb-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">

          {/* Image */}
          <div className="lg:block w-full max-w-md hidden lg:flex">
            <img
              className="rounded-2xl shadow-2xl object-cover w-full h-[420px] border border-white/40 dark:border-gray-700 dark:brightness-90"
              src="https://i.ibb.co/CpPDvgqh/login-image.jpg"
              alt="login"
              style={{ filter: "blur(0.5px) brightness(0.95)" }}
            />
          </div>

          {/* Login Form */}
          <form
            onSubmit={handleLogin}
            className="w-full max-w-md bg-white/30 dark:bg-slate-900 backdrop-blur-lg border border-white/30 dark:border-slate-800 shadow-2xl rounded-2xl p-8 transition-all duration-500 hover:shadow-gray-400 dark:hover:shadow-gray-600"
          >
            <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-7 tracking-tight drop-shadow">
              Login to continue!
            </h2>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-white/60 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-900 dark:text-gray-100 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-200 mb-1 font-medium" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-white/60 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-900 dark:text-gray-100 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            {errorMsg && <p className="text-sm text-red-500 mb-3">{errorMsg}</p>}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-2 rounded-lg shadow-lg transition duration-300 cursor-pointer"
            >
              Login
            </button>

            {/* Divider */}
            <div className="flex items-center my-5">
              <hr className="flex-grow border-t border-gray-300 dark:border-slate-700" />
              <span className="mx-2 text-gray-500 dark:text-gray-400 font-medium">OR</span>
              <hr className="flex-grow border-t border-gray-300 dark:border-slate-700" />
            </div>

            {/* Google Sign-In */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full border border-gray-300 dark:border-slate-700 hover:border-gray-500 dark:hover:border-slate-500 bg-white/70 dark:bg-slate-800 text-gray-700 dark:text-gray-100 py-2 flex justify-center items-center rounded-lg transition duration-300 cursor-pointer shadow"
            >
              <FcGoogle className="mr-2 text-xl" />
              Sign in with Google
            </button>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-700 dark:text-gray-300 mt-7">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-green-700 dark:text-green-400 hover:text-blue-700 dark:hover:text-green-300 font-semibold underline transition cursor-pointer"
              >
                Register Here
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Login;
