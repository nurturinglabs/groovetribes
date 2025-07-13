import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section id="home" className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="absolute w-full h-full object-cover z-0"
      >
        <source src="/images/videos/herodancers.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 text-center px-4 text-white">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-md">
          Unleash the Beat. Own the Moment.
        </h1>
        <div className="mt-6">
          <Link
            to="/work"
            className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition"
          >
            Work with us
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 bg-black opacity-40 z-0" />
    </section>
  );
}
