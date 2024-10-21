# Slide Analyzer Project

This project consists of a frontend and a backend for analyzing slide presentations. Below are the instructions to set up and run the project on your local machine.

## Prerequisites

- Python 3.x
- Node.js and npm
- Git

## Setup and Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/slide-analyzer.git
   cd slide-analyzer
   ```

2. **Backend Setup:**

   a. Create a virtual environment:

   ```sh
   python -m venv venv
   ```

   b. Activate the virtual environment:

   - On Windows:
     ```sh
     venv\Scripts\activate
     ```
   - On macOS and Linux:
     ```sh
     source venv/bin/activate
     ```

   c. Install the required packages:

   ```sh
   pip install -r requirements.txt
   ```

3. **Frontend Setup:**

   a. Navigate to the frontend directory:

   ```sh
   cd slide_analyzer_frontend
   ```

   b. Install the required packages:

   ```sh
   npm install
   ```

   c. Return to the project root:

   ```sh
   cd ..
   ```

## Running the Project

1. Make sure you're in the project root directory.

2. Ensure that the `start.sh` script has execute permissions:

   ```sh
   chmod +x start.sh
   ```

3. Run the project using the start script:

   ```sh
   ./start.sh
   ```

   This script will:

   - Start the backend server
   - Start the frontend development server
   - Open your default web browser to the application

4. The application should now be running:
   - Backend: `http://localhost:8000`
   - Frontend: `http://localhost:3000`

## Additional Configuration

- If you need to change the ports or other configuration settings, you can modify the `start.sh` script and the respective configuration files for the backend and frontend.

## Troubleshooting

- If you encounter any issues with dependencies, make sure both your Python and Node.js installations are up to date.
- For backend issues, check the console where you ran `./start.sh` for Python error messages.
- For frontend issues, check the browser's developer console for JavaScript errors.

## Development

- The backend code is located in the `slide_analyzer_backend` directory.
- The frontend code is located in the `slide_analyzer_frontend` directory.
- Make sure to activate the virtual environment (`source venv/bin/activate` or `venv\Scripts\activate` on Windows) when working on the backend.

## Contributing

If you'd like to contribute to this project, please fork the repository and create a pull request with your changes.

## Support

If you encounter any issues or have questions, please file an issue on the project's GitHub repository.
