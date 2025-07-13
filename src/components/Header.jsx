import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-2 z-50 bg-black/60 backdrop-blur-sm">
      <Link to="/" className="flex items-center bg-white/60 rounded-md px-2 py-1 shadow-md">
        <img
          src="/images/icons/logos.png"
          alt="GrooveTribes Logo"
          className="h-12 w-auto"
        />
      </Link>
      <nav className="hidden md:flex space-x-6 text-white text-base font-medium">
        <Link to="/" className="hover:text-pink-400 transition-colors">Home</Link>
        <Link to="/work" className="hover:text-pink-400 transition-colors">Work with us</Link>
      </nav>
    </header>
  );
}
