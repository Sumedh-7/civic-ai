import os
import json
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def analyze_image(image_bytes: bytes, mime_type: str, description: str):
    prompt = f"""
You are CivicAI, an AI system that analyzes community and environmental problems.

Analyze the uploaded image and user description.

User description:
{description}

Identify the most likely civic/environmental issue.

Return ONLY valid JSON in this exact structure:

{{
    "issue": "specific issue name",
    "category": "one category",
    "severity": "Low, Medium, or High",
    "confidence": 0.0,
    "recommendation": "short recommended action"
}}

Possible categories include:
- Waste Management
- Road Infrastructure
- Water & Drainage
- Public Lighting
- Environment
- Public Safety
- Other

Do not include markdown.
Do not include explanations outside JSON.
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=[
            types.Part.from_bytes(
                data=image_bytes,
                mime_type=mime_type,
            ),
            prompt,
        ],
    )

    text = response.text.strip()

    # Remove accidental markdown fences
    if text.startswith("```"):
        text = text.replace("```json", "").replace("```", "").strip()

    return json.loads(text)