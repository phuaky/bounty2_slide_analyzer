from __future__ import annotations
from pydantic import BaseModel, HttpUrl, EmailStr, Field
from typing import List, Optional


class Submitter(BaseModel):
    name: str
    email: EmailStr


class DeckInfo(BaseModel):
    deck_type: str
    file_url: HttpUrl
    slide_count: int
    file_size_mb: float
    fonts_used: List[str]
    videos_present: bool
    audio_present: bool
    image_count: int


class FormatCheck(BaseModel):
    accepted_format: bool
    file_type: str
    message: str


class SizeCheck(BaseModel):
    size_within_limit: bool
    file_size_mb: float
    message: str


class SlideCountCheck(BaseModel):
    slide_count_within_limit: bool
    slide_count: int
    message: str


class FileAnalysisResult(BaseModel):
    number_of_slides: int
    fonts_used: List[str]
    video_present: bool
    audio_present: bool


class DeterministicCheckResult(BaseModel):
    format_check: FormatCheck
    size_check: SizeCheck
    slide_count_check: SlideCountCheck


class TitleSlideCheck(BaseModel):
    has_title_slide: bool
    message: str


class BulletPointCheck(BaseModel):
    has_few_bullet_points: bool
    message: str


class ImageCheck(BaseModel):
    has_images: bool
    image_count: int
    message: str


class SlideAnalysis(BaseModel):
    slide_number: int
    analysis: dict  # This can be more specific if needed


class ProbabilisticCheckResult(BaseModel):
    title_slide_check: TitleSlideCheck
    bullet_point_check: BulletPointCheck
    image_check: ImageCheck
    slide_analyses: List[SlideAnalysis]


class Status(BaseModel):
    all_tests_passed: bool
    submission_allowed: bool
    next_steps: str


class AdminInfo(BaseModel):
    admin_submission_status: str
    submitted_at: str
    errors: Optional[List[dict]] = None
    total_submissions: int
    total_errors: Optional[int] = None
    decks_to_merge: int


class AnalysisRequest(BaseModel):
    file_path: str
    deck_format: str


class AnalysisResponse(BaseModel):
    submission_id: Optional[str] = None
    submitter: Optional[Submitter] = None
    deck_info: Optional[DeckInfo] = None
    deterministic_checks: DeterministicCheckResult
    file_analysis: FileAnalysisResult
    probabilistic_checks: ProbabilisticCheckResult
    status: Optional[Status] = None
    admin_info: Optional[AdminInfo] = None
    slides: list[SlideInfo] = []  # Add this field to include slide information


class SlideInfo(BaseModel):
    slide_number: int
    image_path: str
