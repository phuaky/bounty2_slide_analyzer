async def process_slide_deck(file_path, deck_format):
    """
    Processes the slide deck at the given file path and runs AI checks using GPT-4o-mini.
    """
    if not os.path.exists(file_path):
        logging.error(f"Error: File not found: {file_path}")
        return None

    # Extract slides
    slide_images = extract_slides(file_path, deck_format)
    if not slide_images:
        logging.error("No slides extracted.")
        return None

    # Analyze the file using appropriate function for deterministic checks
    analysis_data = globals()[f"analyze_{deck_format.lower()}"](file_path)

    if 'error' in analysis_data:
        logging.error(f"Error analyzing file: {analysis_data['error']}")
        return None

    num_slides = len(slide_images)
    file_size_mb = os.path.getsize(file_path) / (1024 * 1024)

    # Perform deterministic checks
    deterministic_checks = perform_deterministic_checks(
        file_path, deck_format, num_slides, file_size_mb)

    # Perform probabilistic checks on each slide
    slide_analyses = []
    for i, image_path in enumerate(slide_images):
        analysis = await analyze_slide(image_path, i + 1)
        slide_analyses.append(analysis)

    # Interpret results
    has_title_slide = any(slide.get('is_title_slide', '').lower()
                          == 'yes' for slide in slide_analyses)
    bullet_point_count = sum(int(slide.get('bullet_points', 0))
                             for slide in slide_analyses)
    image_count = sum(int(slide.get('images', 0)) for slide in slide_analyses)

    adherence = [slide.get('adheres_to_best_practices',
                           '').lower() == 'yes' for slide in slide_analyses]
    compliance_score = sum(adherence) / len(adherence)

    # Prepare the result dictionary
    all_tests_passed = all([
        has_title_slide,
        # Assuming max 3 bullet points per slide on average is "few"
        bullet_point_count <= num_slides * 3,
        image_count > 0,
        compliance_score > 0.7  # Assuming 70% compliance is good
    ])

    result = {
        "submission_id": "12345",  # Replace with actual submission ID logic
        "submitter": {
            "name": "John Doe",  # Replace with actual data
            "email": "john@example.com"  # Replace with actual data
        },
        "deck_info": {
            "deck_type": deck_format,
            "file_url": f"file://{file_path}",
            "slide_count": num_slides,
            "file_size_mb": file_size_mb,
            "fonts_used": analysis_data.get('fonts_used', []),
            "videos_present": analysis_data.get('video_present', False),
            "audio_present": analysis_data.get('audio_present', False),
            "image_count": image_count
        },
        "deterministic_checks": deterministic_checks,
        "probabilistic_checks": {
            "title_slide_check": {
                "has_title_slide": has_title_slide,
                "message": "Title slide detected" if has_title_slide else "No title slide detected"
            },
            "bullet_point_check": {
                "has_few_bullet_points": bullet_point_count <= num_slides * 3,
                "message": f"Total bullet points: {bullet_point_count}"
            },
            "image_check": {
                "has_images": image_count > 0,
                "image_count": image_count,
                "message": f"Total images/graphics detected: {image_count}"
            },
            "compliance_check": {
                "is_compliant": compliance_score > 0.7,
                "message": f"Compliance score: {compliance_score:.2f}"
            }
        },
        "status": {
            "all_tests_passed": all_tests_passed,
            "submission_allowed": True,  # You might want to adjust this based on your criteria
            "next_steps": "Your presentation is accepted." if all_tests_passed else "Please review the feedback and make necessary changes."
        },
        "admin_info": {
            "admin_submission_status": "In Review",
            "submitted_at": get_current_timestamp(),
            "total_submissions": get_total_submissions(),
            "decks_to_merge": 0
        }
    }

    # Clean up temporary slide images
    for image_path in slide_images:
        os.remove(image_path)

    return result
