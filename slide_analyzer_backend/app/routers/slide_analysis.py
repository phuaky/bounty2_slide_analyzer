# app/routers/slide_analysis.py

from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from app.services.slide_processor import process_slide_deck, get_slide_image_path
# Import the response model
from app.models.schemas import AnalysisResponse, SlideInfo
import os
import logging
import traceback
import uuid

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/process-slide-deck/", response_model=AnalysisResponse)
async def process_slide_deck_endpoint(deck_format: str = Form(...),
                                      file: UploadFile = File(...)):

    # Generate a unique processing ID
    processing_id = str(uuid.uuid4())

    # Create uploads directory if it doesn't exist
    uploads_dir = "uploads"
    os.makedirs(uploads_dir, exist_ok=True)
    file_location = os.path.join(uploads_dir, file.filename)

    # Save the uploaded file
    try:
        logger.info(f"Saving uploaded file to {file_location}")
        with open(file_location, "wb") as f:
            contents = await file.read()
            f.write(contents)
        logger.info(f"File saved successfully: {file_location}")
    except Exception as e:
        logger.error(f"Error saving uploaded file: {e}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500,
                            detail="Failed to save the uploaded file.")

    # Process the slide deck
    try:
        logger.info(f"Starting to process slide deck: {file_location}")
        result = await process_slide_deck(file_location, processing_id)
        if result is None:
            logger.error("Processing failed, result is None")
            raise HTTPException(status_code=500, detail="Processing failed.")

        # Update the slides with the correct image URLs
        result.slides = [
            SlideInfo(slide_number=i + 1,
                      image_url=f"/api/slide-thumbnails/{processing_id}/{i+1}")
            for i in range(result.file_analysis.number_of_slides)
        ]

        logger.info(f"Slides with image URLs: {result.slides}")
        logger.info("Slide deck processed successfully")
        logger.info(f"Result: {result}")
        return result
    except Exception as e:
        logger.error(f"Error processing slide deck: {e}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500,
                            detail="Failed to process the slide deck.")
    finally:
        # Note: We're not deleting the uploaded file immediately anymore
        logger.info(f"Processed file: {file_location}")


@router.get("/slide-images/{slide_number}")
async def get_slide_image(slide_number: int):
    # This assumes that the most recent processed file is the one we want
    # You might need to implement a more robust way to track the current file
    processed_files = [
        f for f in os.listdir("uploads")
        if f.endswith(".pptx") or f.endswith(".pdf")
    ]
    if not processed_files:
        raise HTTPException(status_code=404, detail="No processed files found")

    latest_file = max(
        processed_files,
        key=lambda f: os.path.getctime(os.path.join("uploads", f)))
    file_location = os.path.join("uploads", latest_file)

    image_path = get_slide_image_path(file_location, slide_number)
    if not os.path.exists(image_path):
        logger.warning(f"Slide image not found: {image_path}")
        raise HTTPException(status_code=404, detail="Slide image not found")

    logger.info(f"Returning slide image: {image_path}")
    return FileResponse(image_path, media_type="image/png")


@router.get("/slide-thumbnails/{processing_id}/{slide_number}")
async def get_slide_thumbnail(processing_id: str, slide_number: int):
    image_path = get_slide_image_path(processing_id, slide_number)
    if not os.path.exists(image_path):
        logger.warning(f"Slide thumbnail not found: {image_path}")
        raise HTTPException(status_code=404,
                            detail="Slide thumbnail not found")
    logger.info(f"Returning slide thumbnail: {image_path}")
    return FileResponse(image_path, media_type="image/png")


@router.get("/")
async def root():
    return {"message": "Welcome to the Slide Analyzer API"}
