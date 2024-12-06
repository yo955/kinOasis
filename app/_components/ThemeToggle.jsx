"use client";
import { useState, useEffect } from "react";
import { FaMoon } from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";

const ThemeToggle = () => {
  const [darkMode, SetDarkMode] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") SetDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className="relative w-16 h-8 flex items-center justify-center   cursor-pointer rounded-full p-1"
      onClick={() => SetDarkMode(!darkMode)}
    >
      {darkMode ? (
        <FaMoon className="text-white" size={35} />
      ) : (
        <IoSunny className="text-yellow-400" size={35} />
      )}
    </div>
  );
};

export default ThemeToggle;
