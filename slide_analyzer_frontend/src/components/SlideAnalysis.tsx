"use client";
import React from "react";

interface Analysis {
  is_title_slide: boolean;
  bullet_points: number;
  images: number;
  adheres_to_best_practices: boolean;
  suggestions: string;
}

interface SlideAnalysisItem {
  slide_number: number;
  analysis: Analysis;
}

interface SlideAnalysisProps {
  slideAnalysis: SlideAnalysisItem[];
  selectedSlide: number;
}

const SlideAnalysis: React.FC<SlideAnalysisProps> = ({
  slideAnalysis,
  selectedSlide,
}) => {
  const analysis = slideAnalysis.find(
    (item) => item.slide_number === selectedSlide,
  )?.analysis;

  if (!analysis) {
    return <p>No analysis available for this slide.</p>;
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Slide {selectedSlide} Analysis
      </h3>
      <ul className="space-y-2">
        <li>
          <strong>Is Title Slide:</strong>{" "}
          {analysis.is_title_slide ? "Yes" : "No"}
        </li>
        <li>
          <strong>Bullet Points:</strong> {analysis.bullet_points}
        </li>
        <li>
          <strong>Images:</strong> {analysis.images}
        </li>
        <li>
          <strong>Adheres to Best Practices:</strong>{" "}
          {analysis.adheres_to_best_practices ? "Yes" : "No"}
        </li>
        <li>
          <strong>Suggestions:</strong> {analysis.suggestions}
        </li>
      </ul>
    </div>
  );
};

export default SlideAnalysis;
