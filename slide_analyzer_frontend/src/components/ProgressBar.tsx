import React from "react";

interface DeterministicChecks {
  format_check: {
    accepted_format: boolean;
  };
  size_check: {
    size_within_limit: boolean;
  };
  slide_count_check: {
    slide_count_within_limit: boolean;
  };
}

interface ProbabilisticChecks {
  title_slide_check: {
    has_title_slide: boolean;
  };
  bullet_point_check: {
    has_few_bullet_points: boolean;
  };
  image_check: {
    has_images: boolean;
  };
}

interface AnalysisResult {
  deterministic_checks: DeterministicChecks;
  probabilistic_checks: ProbabilisticChecks;
}

interface ProgressBarProps {
  analysisResult: AnalysisResult;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ analysisResult }) => {
  const { deterministic_checks, probabilistic_checks } = analysisResult;
  const totalChecks = 6; // Adjust based on actual number of checks

  const passedChecks = [
    deterministic_checks.format_check.accepted_format,
    deterministic_checks.size_check.size_within_limit,
    deterministic_checks.slide_count_check.slide_count_within_limit,
    probabilistic_checks.title_slide_check.has_title_slide,
    probabilistic_checks.bullet_point_check.has_few_bullet_points,
    probabilistic_checks.image_check.has_images,
  ].filter(Boolean).length;

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
