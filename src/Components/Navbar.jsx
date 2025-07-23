import React, { useState } from 'react';
import {
    Menu,
    X,
    Home,
    Users,
    Info,
    Phone,
    LogIn,
    LayoutDashboard
} from 'lucide-react';
import { Link, useLocation } from 'react-router';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/', icon: <Home className="w-4 h-4 mr-1" /> },
        { name: 'Biodatas', path: '/biodatas', icon: <Users className="w-4 h-4 mr-1" /> },
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4 mr-1" /> },
        { name: 'About Us', path: '/about-us', icon: <Info className="w-4 h-4 mr-1" /> },
        { name: 'Contact Us', path: '/contact-us', icon: <Phone className="w-4 h-4 mr-1" /> },
        { name: 'Login', path: '/login', icon: <LogIn className="w-4 h-4 mr-1" /> },
        { name: 'Register', path: '/register', icon: <LogIn className="w-4 h-4 mr-1" /> }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 bg-white/40 backdrop-blur-xl shadow-lg border-b border-white/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                {/* Logo & Brand */}
                <div className="flex items-center space-x-3">
                    <img
                        src="https://i.ibb.co/p9Q5WT4/matrimony-1.png"
                        alt="Matrify Logo"
                        className="w-11 h-11 rounded-full shadow-lg ring-2 ring-white/30"
                    />
                    <span className="text-2xl font-extrabold tracking-wider bg-gradient-to-r from-green-600 via-blue-600 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
                        Matrify
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-2 items-center">
                    {navItems.map(({ name, path, icon }, idx) => (
                        <Link
                            key={idx}
                            to={path}
                            className={`
                                flex items-center px-4 py-2 rounded-full font-medium transition-all duration-200
                                ${isActive(path)
                                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                                    : 'text-gray-800 hover:bg-white/60 hover:shadow-md hover:text-green-700'
                                }
                            `}
                        >
                            {icon}
                            {name}
                        </Link>
                    ))}
                </div>

                {/* Hamburger Icon */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                        className="text-gray-800 hover:text-green-700 transition"
                    >
                        {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <div
                className={`
                    md:hidden transition-all duration-500 ease-in-out overflow-hidden
                    ${isOpen ? 'max-h-96 opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-90'}
                `}
            >
                <div className="px-4 pb-4 space-y-2 bg-white/70 backdrop-blur-xl rounded-b-2xl shadow-xl border-t border-white/20">
                    {navItems.map(({ name, path, icon }, idx) => (
                        <Link
                            key={idx}
                            to={path}
                            onClick={() => setIsOpen(false)}
                            className={`
                                flex items-center px-4 py-2 rounded-full font-medium transition-all duration-200
                                ${isActive(path)
                                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow'
                                    : 'text-gray-800 hover:bg-white/80 hover:text-green-700'
                                }
                            `}
                        >
                            {icon}
                            {name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;