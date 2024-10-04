# app/logging_config.py

import logging
from logging.handlers import RotatingFileHandler


def setup_logging():
    logger = logging.getLogger("slide_analyzer")
    # Set to DEBUG for development, INFO for production
    logger.setLevel(logging.DEBUG)

    # Create a file handler that logs debug and higher level messages
    handler = RotatingFileHandler(
        "slide_analyzer.log", maxBytes=5*1024*1024, backupCount=2)  # 5 MB per file
    handler.setLevel(logging.DEBUG)

    # Create a console handler for outputting logs to the console
    console_handler = logging.StreamHandler()
    # Show INFO level and above in console
    console_handler.setLevel(logging.INFO)

    # Create a formatter and set it for both handlers
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)

    # Add the handlers to the logger
    logger.addHandler(handler)
    logger.addHandler(console_handler)

    return logger
