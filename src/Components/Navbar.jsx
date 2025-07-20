import React, { useState } from 'react';
import { Menu, X, Home, Users, Info, Phone, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/', icon: <Home className="w-4 h-4 mr-1" /> },
        { name: 'Biodatas', path: '/biodatas', icon: <Users className="w-4 h-4 mr-1" /> },
        { name: 'About Us', path: '/about-us', icon: <Info className="w-4 h-4 mr-1" /> },
        { name: 'Contact Us', path: '/contact-us', icon: <Phone className="w-4 h-4 mr-1" /> },
        { name: 'Login', path: '/login', icon: <LogIn className="w-4 h-4 mr-1" /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-[#B5C18E] roboto backdrop-blur-md text-white shadow-2xl rounded-b-2xl border-b border-white/10 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img
                        src="https://i.ibb.co/p9Q5WT4/matrimony-1.png"
                        alt="Matrify Logo"
                        className="w-10 h-10 rounded-full shadow-lg ring-2 ring-white/20"
                    />
                    <span className="text-2xl font-bold tracking-wide drop-shadow-md">Matrify</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 items-center">
                    {navItems.map(({ name, path, icon }, idx) => (
                        <Link
                            key={idx}
                            to={path}
                            className={`flex items-center transition-all duration-200 font-medium hover:drop-shadow-lg ${
                                isActive(path) ? 'text-black' : 'hover:text-[#D3F3EE]'
                            }`}
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
                        className="text-white hover:text-mint transition"
                    >
                        {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <div
                className={`md:hidden transform-gpu origin-top transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-90'
                }`}
            >
                <div className="px-4 pb-4 space-y-3 bg-[#B5C18E] backdrop-blur rounded-b-2xl shadow-xl border-t border-white/10">
                    {navItems.map(({ name, path, icon }, idx) => (
                        <Link
                            key={idx}
                            to={path}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center font-medium transition-all duration-200 hover:pl-2 ${
                                isActive(path) ? 'text-black' : 'text-white hover:text-[#D3F3EE]'
                            }`}
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
