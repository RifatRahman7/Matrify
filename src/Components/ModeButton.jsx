import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ModeButton = () => {
    const [theme, setTheme] = useState("")
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    useEffect(() => {
        const htmlElement = document.documentElement;
        htmlElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }
    return (
        <>
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-400 hover:bg-gray-300"
                title="Toggle Theme"
            >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
        </>
    );
};

export default ModeButton;