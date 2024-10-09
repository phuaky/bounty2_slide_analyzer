// app/admin/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<
    { id: string; submitter: string; status: string; errors?: string[] }[]
  >([]);

  useEffect(() => {
    // Fetch all submissions
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/admin/submissions/`)
      .then((response) => setSubmissions(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow w-full max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">All Submissions</h1>
        {submissions.length === 0 ? (
          <p>No submissions have been made yet.</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Submission ID</th>
                <th className="py-2">Submitter</th>
                <th className="py-2">Status</th>
                <th className="py-2">Errors</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td className="py-2">{submission.id}</td>
                  <td className="py-2">{submission.submitter}</td>
                  <td className="py-2">{submission.status}</td>
                  <td className="py-2">{/* Display errors if any */}</td>
                  <td className="py-2">
                    {/* Add actions like view details, approve, etc. */}
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
