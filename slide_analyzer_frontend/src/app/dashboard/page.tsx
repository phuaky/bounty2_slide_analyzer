"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

// Define a type for the submission object
interface Submission {
  id: string;
  status: string;
  // Add other properties as needed
}

export default function Dashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    // Fetch user's submissions
    axios
      .get<Submission[]>(`${process.env.NEXT_PUBLIC_API_URL}/user-submissions/`)
      .then((response) => setSubmissions(response.data))
      .catch((error) => console.error("Error fetching submissions:", error));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow w-full max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Your Submissions</h1>
        {submissions.length === 0 ? (
          <p>You have not submitted any decks yet.</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Submission ID</th>
                <th className="py-2">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td className="py-2">{submission.id}</td>
                  <td className="py-2">{submission.status}</td>
                  <td className="py-2">
                    {/* Add actions like view details, edit, etc. */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
