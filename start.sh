#!/bin/bash

# Install backend dependencies
echo "Installing backend dependencies..."
pushd slide_analyzer_backend
python -m pip install --no-cache-dir -r requirements.txt
popd

# Build frontend
echo "Building frontend..."
pushd slide_analyzer_frontend
npm install
npm run build
popd

# Run backend (which serves the frontend)
echo "Starting backend..."
pushd slide_analyzer_backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
popd
