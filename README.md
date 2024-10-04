# Slide Analyzer Project

This project consists of a frontend and a backend for analyzing slide presentations. Below are the instructions to set up and run both parts of the project using a virtual environment (venv).

## Prerequisites

- Python 3.x
- Node.js and npm (for the frontend)
- Virtualenv package (if not installed, you can install it using `pip install virtualenv`)

## Backend Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/slide_analyzer_backend.git
   cd slide_analyzer_backend
   ```

2. **Create a virtual environment:**

   ```sh
   python -m venv venv
   ```

3. **Activate the virtual environment:**

   - On Windows:
     ```sh
     venv\Scripts\activate
     ```
   - On macOS and Linux:
     ```sh
     source venv/bin/activate
     ```

4. **Install the required packages:**

   ```sh
   pip install -r requirements.txt
   ```

5. **Run the backend server:**

   ```sh
   uvicorn app.main:app --reload
   ```

   The backend server should now be running at `http://127.0.0.1:8000`.

## Frontend Setup

1. **Navigate to the frontend directory:**

   ```sh
   cd slide_analyzer_frontend
   ```

2. **Install the required packages:**

   ```sh
   npm install
   ```

3. **Run the frontend development server:**

   ```sh
   npm start
   ```

   The frontend should now be running at `http://localhost:3000`.

## Running the Project

1. Ensure that both the backend and frontend servers are running.
2. Open your web browser and navigate to `http://localhost:3000`.
3. You should now be able to use the Slide Analyzer application.

## Additional Notes

- Make sure to update the CORS settings in `app/main.py` to allow requests from your frontend's URL in a production environment.
- If you encounter any issues, please refer to the documentation or raise an issue on the project's GitHub repository.
