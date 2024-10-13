// shared/types.ts

// Submitter interface
export interface Submitter {
  name: string;
  email: string; // EmailStr corresponds to string in TypeScript
}

// DeckInfo interface
export interface DeckInfo {
  deck_type: string;
  file_url: string; // HttpUrl corresponds to string in TypeScript
  slide_count: number;
  file_size_mb: number;
  fonts_used: string[];
  videos_present: boolean;
  audio_present: boolean;
  image_count: number;
}

// FormatCheck interface
export interface FormatCheck {
  accepted_format: boolean;
  file_type: string;
  message: string;
}

// SizeCheck interface
export interface SizeCheck {
  size_within_limit: boolean;
  file_size_mb: number;
  message: string;
}

// SlideCountCheck interface
export interface SlideCountCheck {
  slide_count_within_limit: boolean;
  slide_count: number;
  message: string;
}

// DeterministicChecks interface
export interface DeterministicChecks {
  format_check: FormatCheck;
  size_check: SizeCheck;
  slide_count_check: SlideCountCheck;
}

// Analysis interface for individual slides
export interface Analysis {
  is_title_slide: boolean;
  bullet_points: number;
  images: number;
  adheres_to_best_practices: boolean;
  suggestions: string;
  // Add other properties as needed
}

// SlideAnalysisItem interface
export interface SlideAnalysisItem {
  slide_number: number;
  analysis: Analysis;
}

// TitleSlideCheck interface
export interface TitleSlideCheck {
  has_title_slide: boolean;
  message: string;
}

// BulletPointCheck interface
export interface BulletPointCheck {
  has_few_bullet_points: boolean;
  message: string;
}

// ImageCheck interface
export interface ImageCheck {
  has_images: boolean;
  image_count: number;
  message: string;
}

// ProbabilisticChecks interface
export interface ProbabilisticChecks {
  title_slide_check: TitleSlideCheck;
  bullet_point_check: BulletPointCheck;
  image_check: ImageCheck;
  slide_analyses: SlideAnalysisItem[];
}

// FileAnalysisResult interface
export interface FileAnalysisResult {
  number_of_slides: number;
  fonts_used: string[];
  video_present: boolean;
  audio_present: boolean;
}

// Status interface
export interface Status {
  all_tests_passed: boolean;
  submission_allowed: boolean;
  next_steps: string;
}

// AdminInfo interface
export interface AdminInfo {
  admin_submission_status: string;
  submitted_at: string;
  errors?: { [key: string]: any }[];
  total_submissions: number;
  total_errors?: number;
  decks_to_merge: number;
}

// SlideInfo interface
export interface SlideInfo {
  slide_number: number;
  image_url: string;
}

// AnalysisResult interface
export interface AnalysisResult {
  submission_id?: string;
  submitter?: Submitter;
  deck_info?: DeckInfo;
  deterministic_checks: DeterministicChecks;
  file_analysis: FileAnalysisResult;
  probabilistic_checks: ProbabilisticChecks;
  status?: Status;
  admin_info?: AdminInfo;
  slides: SlideInfo[];
  processing_id: string;
}
