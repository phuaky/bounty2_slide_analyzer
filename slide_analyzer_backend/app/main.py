import sys
from dotenv import load_dotenv
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import slide_analysis
from app.logging_config import setup_logging


# Get the directory of the current file
current_dir = os.path.dirname(os.path.abspath(__file__))
# Go up one level to the project root (assuming .env is there)
project_root = os.path.dirname(current_dir)
# Construct the path to the .env file
env_path = os.path.join(project_root, '.env')

# Load the .env file before any other imports
load_dotenv(dotenv_path=env_path, verbose=True)

# Now import other modules that depend on the environment variables

# Initialize FastAPI app
app = FastAPI()

# Set up logging
logger = setup_logging()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(slide_analysis.router)

# Event handlers (if any)


@app.on_event("startup")
async def startup_event():
    # Initialize any resources here
    pass


@app.on_event("shutdown")
async def shutdown_event():
    # Clean up resources here
    pass
