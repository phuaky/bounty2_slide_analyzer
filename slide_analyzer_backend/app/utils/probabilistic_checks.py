# app/utils/gpt4_vision.py

import base64
from openai import OpenAI
import os
import logging
import json
import re


def get_openai_client():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY not found in environment variables")
    return OpenAI(api_key=api_key)


def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')


async def gpt4_vision_analysis(image_data, prompt):
    """
    Helper function to use GPT-4o-mini for image analysis.
    """
    base64_image = base64.b64encode(image_data).decode('utf-8')

    client = get_openai_client()

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/png;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=500
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        logging.error(f"Error in GPT-4o-mini analysis: {e}")
        return ""


async def analyze_slide_image(image_data, slide_number):
    """
    Analyze a single slide using GPT-4o-mini.
    """
    prompt = f"""
    Analyze slide number {slide_number} of a presentation and provide the following information:
    1. Is this a title slide? (true/false)
    2. How many bullet points are present?
    3. Are there any images or graphics? If so, how many?
    4. Does the slide adhere to best practices for presentations? (minimal text, visual emphasis)
    5. Any suggestions for improvement?
    Please analyze the slide and provide a JSON response without any code fences or additional text, using the following schema:
    {{
      "is_title_slide": true or false,
      "bullet_points": integer,
      "images": integer,
      "adheres_to_best_practices": true or false,
      "suggestions": string
    }}
    """
    response_text = await gpt4_vision_analysis(image_data, prompt)

    # Remove code fences if present
    cleaned_response = re.sub(
        r'^```[^\n]*\n|```$', '', response_text.strip(), flags=re.MULTILINE)

    try:
        analysis = json.loads(cleaned_response)
    except json.JSONDecodeError:
        logging.error(
            f"Failed to parse GPT response for slide {slide_number}.")
        analysis = {}
    return analysis
