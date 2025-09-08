import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-slate-950 text-gray-700 dark:text-gray-300 py-10 px-6 md:px-12 transition-colors duration-500">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Branding */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Matrify</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Connecting hearts with trust and tradition. Find your perfect match with Matrify — where souls unite.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-gray-900 dark:hover:text-white transition">Home</Link></li>
                        <li><Link to="/biodatas" className="hover:text-gray-900 dark:hover:text-white transition">Biodatas</Link></li>
                        <li><Link to="/about-us" className="hover:text-gray-900 dark:hover:text-white transition">About Us</Link></li>
                        <li><Link to="/contact-us" className="hover:text-gray-900 dark:hover:text-white transition">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="text-gray-600 dark:text-gray-400">Email: support@matrify.com</li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Follow Us</h3>
                    <div className="flex space-x-4 mt-2">
                        <a href="https://www.facebook.com/rifatdcian" target="_blank" className="hover:text-gray-900 dark:hover:text-white text-lg hover:scale-115 transition"><FaFacebookF /></a>
                        <a href="https://github.com/RifatRahman7" target="_blank" className="hover:text-gray-900 dark:hover:text-white text-lg hover:scale-115 transition"><FaGithub/></a>
                        <a href="https://www.linkedin.com/in/rifat-rahman7/" target="_blank" className="hover:text-gray-900 dark:hover:text-white text-lg hover:scale-115 transition"><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm mt-10 border-t border-gray-300 dark:border-gray-700 pt-4">
                © {new Date().getFullYear()} Matrify. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
