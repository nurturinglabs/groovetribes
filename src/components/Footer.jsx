import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white text-sm py-6 px-4 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <img
            src="/images/icons/logos.png"
            alt="GrooveTribes Logo"
            className="h-8 w-auto"
          />
          <span className="font-semibold">GrooveTribes</span>
        </div>
        <div className="text-center md:text-right">
          <p>&copy; {new Date().getFullYear()} GrooveTribes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
