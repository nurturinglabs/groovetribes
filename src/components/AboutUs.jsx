import React from "react";

export default function AboutUs() {
  return (
    <section className="py-16 px-6 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2">
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
            <video
              src="/images/videos/about-group-dancers.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="mb-4">
            GrooveTribes creates energetic, real-world dance content for YouTube Shorts, Reels, and TikTok. Every
            weekend, we team up with talented freelancers to shoot high-energy choreography in exciting indoor and
            outdoor locations.
          </p>
          <p>Come groove with us – or watch from the front row.</p>
        </div>
      </div>
    </section>
  );
}
