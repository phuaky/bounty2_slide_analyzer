// components/ProgressBar.tsx

import React from 'react';

interface ProgressBarProps {
  analysisResult: any;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ analysisResult }) => {
  const deterministicChecks = analysisResult.deterministic_checks;
  const probabilisticChecks = analysisResult.probabilistic_checks;

  const totalChecks = 6; // Adjust based on actual number of checks
  let passedChecks = 0;

  if (deterministicChecks.format_check.accepted_format) passedChecks++;
  if (deterministicChecks.size_check.size_within_limit) passedChecks++;
  if (deterministicChecks.slide_count_check.slide_count_within_limit) passedChecks++;
  if (probabilisticChecks.title_slide_check.has_title_slide) passedChecks++;
  if (probabilisticChecks.bullet_point_check.has_few_bullet_points) passedChecks++;
  if (probabilisticChecks.image_check.has_images) passedChecks++;

  const progressPercentage = (passedChecks / totalChecks) * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">
          Validation Progress
        </span>
        <span className="text-sm font-medium text-gray-700">
          {passedChecks} / {totalChecks} checks passed
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
