import React, { useState } from "react";
import Header from "../components/Header";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function WorkWithUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    videoLink: "",
    rate: ""
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (field, value) => {
    let error = "";
    switch (field) {
      case "name":
        if (!value.trim()) error = "Name is required";
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format";
        break;
      case "videoLink":
        if (!value) error = "Reel link is required";
        else if (!/^https?:\/\//.test(value)) error = "Enter a valid URL";
        break;
      case "rate":
        if (!value) error = "Rate is required";
        else if (parseFloat(value) < 0) error = "Rate must be non-negative";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: validate(id, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validate(key, value);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        await addDoc(collection(db, "submissions"), formData);
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "", videoLink: "", rate: "" });
      } catch (error) {
        console.error("Error saving to Firebase:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header />
      <div className="max-w-3xl mx-auto pt-32 pb-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Work With Us</h1>
        {submitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center">
            Thank you! We’ve received your submission and will get back to you soon.
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us a bit about yourself..."
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="videoLink">Reel Link (Instagram / Shorts / TikTok)</label>
            <input
              id="videoLink"
              type="url"
              value={formData.videoLink}
              onChange={handleChange}
              placeholder="https://www.instagram.com/reel/..."
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.videoLink && <p className="text-red-500 text-sm mt-1">{errors.videoLink}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rate">Preferred Hourly Rate (in USD)</label>
            <input
              id="rate"
              type="number"
              min="0"
              step="1"
              value={formData.rate}
              onChange={handleChange}
              placeholder="e.g. 25"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.rate && <p className="text-red-500 text-sm mt-1">{errors.rate}</p>}
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
