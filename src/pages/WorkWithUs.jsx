import React, { useState } from "react";
import Header from "../components/Header";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function WorkWithUs() {
  const [formData, setFormData] = useState({
    name: "",
    preferredContact: "Email",
    contactInfo: "",
    videoLink: "",
    rate: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.contactInfo.trim())
      newErrors.contactInfo = `Please enter a valid ${formData.preferredContact.toLowerCase()} contact`;
    if (!formData.videoLink.trim()) newErrors.videoLink = "Reel/Video link is required";
    if (!formData.rate.trim()) newErrors.rate = "Hourly rate is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await addDoc(collection(db, "submissions"), formData);
      setSubmitted(true);
      setFormData({
        name: "",
        preferredContact: "Email",
        contactInfo: "",
        videoLink: "",
        rate: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const getContactLabel = () => {
    switch (formData.preferredContact) {
      case "Phone":
        return "Phone Number";
      case "WhatsApp":
        return "WhatsApp Number";
      case "Instagram":
        return "Instagram Handle";
      case "Other":
        return "Other Contact Info";
      default:
        return "Email Address";
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <div className="max-w-lg mx-auto pt-24 pb-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Work With Us</h1>
        {submitted && (
          <div className="bg-green-100 text-green-800 p-4 rounded mb-4 text-center text-sm">
            Submission successful! We'll get in touch soon.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 py-1.5 rounded bg-white border border-gray-300"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm">Preferred Communication Method</label>
            <select
              name="preferredContact"
              value={formData.preferredContact}
              onChange={handleChange}
              className="w-full p-2 py-1.5 rounded bg-white border border-gray-300"
            >
              <option>Email</option>
              <option>Phone</option>
              <option>WhatsApp</option>
              <option>Instagram</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm">{getContactLabel()}</label>
            <input
              type="text"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              className="w-full p-2 py-1.5 rounded bg-white border border-gray-300"
            />
            {errors.contactInfo && (
              <p className="text-red-500 text-sm mt-1">{errors.contactInfo}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm">Reel / Short / TikTok Link</label>
            <input
              type="url"
              name="videoLink"
              value={formData.videoLink}
              onChange={handleChange}
              className="w-full p-2 py-1.5 rounded bg-white border border-gray-300"
            />
            {errors.videoLink && (
              <p className="text-red-500 text-sm mt-1">{errors.videoLink}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm">Your Hourly Rate (₹)</label>
            <input
              type="number"
              name="rate"
              value={formData.rate}
              onChange={handleChange}
              className="w-full p-2 py-1.5 rounded bg-white border border-gray-300"
            />
            {errors.rate && (
              <p className="text-red-500 text-sm mt-1">{errors.rate}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm">Message / Introduction</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 py-1.5 rounded bg-white border border-gray-300"
              rows="3"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
