// components/UploadForm.tsx

"use client";

import React, { useState } from "react";
import SlidePreview from "./SlidePreview";
import SlideAnalysis from "./SlideAnalysis";
import ProgressBar from "./ProgressBar";
import { AnalysisResult } from "../../../shared/types";
import axios from "axios";

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [deckFormat, setDeckFormat] = useState<string>("pdf");
  const [message, setMessage] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedSlide, setSelectedSlide] = useState<number>(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleDeckFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeckFormat(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('deck_format', deckFormat);

    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/process-slide-deck`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setAnalysisResult(response.data);
      setMessage("Analysis completed successfully!");
    } catch (error) {
      console.error('There was an error uploading the file!', error);
      setMessage("Error: Failed to analyze the slide deck. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6 mb-6">
        {/* Deck Format Selection */}
        <div>
          <label
            htmlFor="deckFormat"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Deck Format
          </label>
          <select
            id="deckFormat"
            value={deckFormat}
            onChange={handleDeckFormatChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          >
            <option value="pdf">PDF</option>
            <option value="pptx">PPTX</option>
            <option value="markdown">Markdown</option>
          </select>
        </div>

        {/* File Upload */}
        <div>
          <label
            htmlFor="fileUpload"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select File
          </label>
          <input
            type="file"
            id="fileUpload"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none ${isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {isLoading ? "Analyzing..." : "Upload and Analyze"}
        </button>

        {/* Message Display */}
        {message && (
          <p
            className={`mt-2 text-sm ${message.includes("error") ? "text-red-600" : "text-green-600"
              }`}
          >
            {message}
          </p>
        )}
      </form>

      {/* Display Analysis Result */}
      {analysisResult && (
        <div className="flex flex-col md:flex-row">
          {/* Slide Preview */}
          <div className="md:w-1/3 pr-4">
            <SlidePreview
              slides={analysisResult.slides}
              selectedSlide={selectedSlide}
              setSelectedSlide={setSelectedSlide}
            />
          </div>

          {/* Slide Analysis */}
          <div className="md:w-2/3 pl-4">
            <ProgressBar analysisResult={analysisResult} />
            <SlideAnalysis
              slideAnalysis={analysisResult.probabilistic_checks.slide_analyses}
              selectedSlide={selectedSlide}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
