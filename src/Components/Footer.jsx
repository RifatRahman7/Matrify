import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-10 px-6 md:px-12 roboto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Branding */}
                <div>
                    <h2 className="text-3xl font-bold text-white mb-4">Matrify</h2>
                    <p className="text-sm text-gray-400">
                        Connecting hearts with trust and tradition. Find your perfect match with Matrify — where souls unite.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                        <li><Link to="/biodatas" className="hover:text-white transition">Biodatas</Link></li>
                        <li><Link to="/about-us" className="hover:text-white transition">About Us</Link></li>
                        <li><Link to="/contact-us" className="hover:text-white transition">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
                        <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
                        <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                        <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Follow Us</h3>
                    <div className="flex space-x-4 mt-2">
                        <a href="#" className="hover:text-white text-lg hover:scale-115"><FaFacebookF /></a>
                        <a href="#" className="hover:text-white text-lg hover:scale-115"><FaInstagram /></a>
                        <a href="#" className="hover:text-white text-lg hover:scale-115"><FaTwitter /></a>
                        <a href="#" className="hover:text-white text-lg hover:scale-115"><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} Matrify. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
