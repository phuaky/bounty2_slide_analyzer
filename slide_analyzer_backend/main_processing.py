import os
from fastapi import HTTPException
from deterministic_checks import format_check, size_check, slide_count_check
from file_analyzers import (
    analyze_pptx,
    analyze_pdf,
    analyze_markdown,
    analyze_keynote,
    analyze_figma,
    analyze_google_slides,
    analyze_canva
)
from schemas import FileAnalysisResult, SlideAnalysis, AnalysisRequest


async def process_file(request: AnalysisRequest):
    # Validate file format
    format_result = format_check(request.file_path)
    if not format_result['accepted_format']:
        raise HTTPException(status_code=400, detail=format_result['message'])

    # Analyze the file
    analysis_function = globals().get(f"analyze_{request.deck_format.lower()}")
    if not analysis_function:
        raise HTTPException(status_code=400, detail="Unsupported deck format")

    analysis_data = analysis_function(request.file_path)
    if 'error' in analysis_data:
        raise HTTPException(status_code=400, detail=analysis_data['error'])

    # Perform deterministic checks
    file_size_mb = os.path.getsize(request.file_path) / (1024 * 1024)
    deterministic_checks = {
        "size_check": size_check(file_size_mb),
        "slide_count_check": slide_count_check(analysis_data['number_of_slides'])
    }

    # Perform probabilistic checks (mocked for example)
    slide_analyses = [SlideAnalysis(
        is_title_slide=True, bullet_points=2, images=1, adheres_to_best_practices=True)]

    # Compile results
    result = {
        "file_analysis": FileAnalysisResult(**analysis_data),
        "deterministic_checks": deterministic_checks,
        "probabilistic_checks": slide_analyses
    }

    return result
