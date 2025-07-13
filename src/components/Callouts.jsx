import React from "react";

export default function Callouts() {
  const callouts = [
    { label: "Weekend Shoots", icon: "/images/icons/calendar.png" },
    { label: "Dancers Welcome", icon: "/images/icons/dancer.png" },
    { label: "Freelancers Welcome", icon: "/images/icons/freelancer.png" },
    { label: "Exciting Content", icon: "/images/icons/content-camera.png" },
  ];

  return (
    <section className="py-10 px-6 bg-white">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {callouts.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 hover:bg-blue-100 transition-colors duration-200 p-4 rounded-lg shadow-md"
          >
            <img
              src={item.icon}
              alt={item.label}
              className="w-16 h-16 mx-auto mb-3"
            />
            <div className="text-lg font-semibold text-gray-700">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
