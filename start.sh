#!/bin/bash

# Install backend dependencies
echo "Installing backend dependencies..."
cd slide_analyzer_backend
python -m pip install --no-cache-dir -r requirements.txt
cd ..

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd slide_analyzer_frontend
npm install
cd ..

# Start frontend development server
echo "Starting frontend development server..."
cd slide_analyzer_frontend
npm run dev &
cd ..

# Run backend in development mode
echo "Starting backend..."
cd slide_analyzer_backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
