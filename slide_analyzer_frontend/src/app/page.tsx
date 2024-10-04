// app/page.tsx

import React from 'react';
import UploadForm from '@/components/UploadForm';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow w-full max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            Slide Analyzer
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            Upload your presentation and get instant analysis
          </p>
          <UploadForm />
        </div>
      </main>
    </div>
  );
}
