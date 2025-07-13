import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "submissions"));
        const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("🔥 Submissions fetched:", results);
        setSubmissions(results);
      } catch (error) {
        console.error("🔥 Error fetching submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Header navItems={[
        { name: "Home", href: "/" },
        { name: "Work with us", href: "/work-with-us" },
      ]} />
      <div className="max-w-4xl mx-auto pt-32 pb-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : submissions.length === 0 ? (
          <p className="text-center">No submissions found.</p>
        ) : (
          <div className="space-y-6">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-white shadow-md rounded px-6 py-4"
              >
                <p><strong>Name:</strong> {submission.name}</p>
                <p><strong>Email:</strong> {submission.email}</p>
                <p><strong>Message:</strong> {submission.message}</p>
                <p><strong>Reel Link:</strong> <a href={submission.videoLink} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{submission.videoLink}</a></p>
                <p><strong>Rate:</strong> ${submission.rate}/hr</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
