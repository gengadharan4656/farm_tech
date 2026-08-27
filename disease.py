import base64
import logging
import os

import requests
from dotenv import load_dotenv
from fastapi import APIRouter, UploadFile, File, HTTPException

load_dotenv()

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/api",
    tags=["Disease Detection"]
)

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

# Gemini vision model through OpenRouter
AI_MODEL = os.getenv(
    "OPENROUTER_MODEL",
    "google/gemini-2.5-flash-lite"
)

AI_SERVICE_ERROR = (
    "Sorry, I couldn't analyze the crop image right now. "
    "Please try again."
)

MAX_IMAGE_SIZE = 10 * 1024 * 1024  # 10 MB

SUPPORTED_IMAGE_TYPES = {
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
}


DISEASE_SYSTEM_PROMPT = """
You are Krishi Vision AI, an agriculture-focused crop disease
analysis assistant.

Your task is to analyze uploaded crop images and provide a
PRELIMINARY visual assessment.

You can analyze crops including:

- Paddy / rice
- Wheat
- Maize
- Millets
- Pulses
- Sugarcane
- Cotton
- Groundnut
- Banana
- Coconut
- Tomato
- Onion
- Chilli
- Brinjal
- Other vegetables
- Fruits
- Horticultural crops

IMPORTANT:

You are providing a preliminary visual assessment, NOT a
laboratory-confirmed diagnosis.

Never claim 100% certainty.

If the image is unclear, blurry, too dark, too distant,
contains no crop, or does not provide enough information,
say that the image is insufficient for reliable analysis.

LANGUAGE:

Answer in the same language as the user's question.

If the user asks in Tamil, answer in Tamil.
If the user asks in English, answer in English.
If the user asks in Hindi, answer in Hindi.
If the user asks in Telugu, answer in Telugu.
If the user asks in Kannada, answer in Kannada.
If the user asks in Malayalam, answer in Malayalam.

For Tanglish or mixed-language questions, respond naturally
in the same mixed style.

Do not announce language detection.

ANALYSIS:

Look carefully at visible:

- Leaf spots
- Leaf discoloration
- Yellowing
- Browning
- Wilting
- Lesions
- Powdery growth
- Mold-like growth
- Holes
- Insect damage
- Stem symptoms
- Fruit symptoms
- Pest signs
- Nutrient-deficiency-like symptoms

Try to identify the most likely disease, pest, deficiency,
or other visible problem.

If several possibilities exist, mention the most likely one
and provide alternative possibilities.

Do not invent symptoms that are not visible.

CONFIDENCE:

Give an estimated confidence based only on the image quality
and visible symptoms.

Use one of:

High
Medium
Low

TREATMENT:

Give practical general management advice.

Prefer:

- Removing severely affected plant parts when appropriate
- Field sanitation
- Proper irrigation
- Avoiding excess moisture
- Proper spacing
- Crop rotation
- Resistant varieties
- Integrated Pest Management
- Biological and cultural methods

For pesticides, fungicides, or herbicides:

Do NOT invent a chemical name or dosage.

Advise the farmer to use only locally approved products and
follow the product label or advice from the Agriculture
Department / KVK / agricultural university.

LOCATION:

If location, crop variety, crop age, or growth stage is not
provided, do not invent it.

If this information is important for a more accurate
recommendation, ask the farmer to provide it.

RESPONSE FORMAT:

Return your answer using exactly these sections:

Disease / Problem:
Confidence:
Visible Symptoms:
Recommended Actions:
Precautions:

Keep the answer practical and easy for farmers to understand.
"""


@router.post("/diagnose")
async def diagnose(
    image: UploadFile = File(...)
):
    """
    Analyze an uploaded crop image using Gemini Vision
    through OpenRouter.
    """

    api_key = os.getenv("OPENROUTER_API_KEY")

    if not api_key:
        logger.error("OPENROUTER_API_KEY is not configured.")

        raise HTTPException(
            status_code=503,
            detail="AI service is not configured on the server."
        )

    # Validate image type
    content_type = (image.content_type or "").lower()

    if content_type not in SUPPORTED_IMAGE_TYPES:
        raise HTTPException(
            status_code=400,
            detail=(
                "Unsupported image format. "
                "Please upload JPG, PNG, or WEBP."
            )
        )

    try:
        # Read uploaded image
        image_bytes = await image.read()

        if not image_bytes:
            raise HTTPException(
                status_code=400,
                detail="The uploaded image is empty."
            )

        if len(image_bytes) > MAX_IMAGE_SIZE:
            raise HTTPException(
                status_code=400,
                detail="Image is too large. Maximum size is 10 MB."
            )

        # Convert image to base64
        image_base64 = base64.b64encode(image_bytes).decode("utf-8")

        # OpenRouter expects the OpenAI-compatible multimodal format
        messages = [
            {
                "role": "system",
                "content": DISEASE_SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": (
                            "Analyze this crop image and identify the "
                            "most likely visible disease, pest, nutrient "
                            "problem, or other crop health issue. "
                            "Provide a preliminary assessment."
                        )
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": (
                                f"data:{content_type};base64,"
                                f"{image_base64}"
                            )
                        }
                    }
                ]
            }
        ]

        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:8000",
            "X-Title": "Digital Krishi Crop Disease Detection"
        }

        payload = {
            "model": AI_MODEL,
            "messages": messages,
            "temperature": 0.2,
            "max_tokens": 900
        }

        response = requests.post(
            OPENROUTER_URL,
            headers=headers,
            json=payload,
            timeout=60
        )

        # Log OpenRouter's actual error during development
        # without exposing the API key.
        if not response.ok:
            logger.error(
                "OpenRouter vision error - status=%s response=%s",
                response.status_code,
                response.text[:2000]
            )

        response.raise_for_status()

        data = response.json()

        choices = data.get("choices", [])

        if not choices:
            logger.error(
                "OpenRouter returned no choices: %s",
                data
            )

            raise HTTPException(
                status_code=502,
                detail=AI_SERVICE_ERROR
            )

        message_data = choices[0].get("message", {})

        reply = message_data.get("content", "")

        if isinstance(reply, list):
            reply = "".join(
                part.get("text", "")
                for part in reply
                if isinstance(part, dict)
            )

        reply = str(reply).strip()

        if not reply:
            logger.error(
                "Gemini vision response was empty."
            )

            raise HTTPException(
                status_code=502,
                detail=AI_SERVICE_ERROR
            )

        return {
            "status": "success",
            "filename": image.filename,
            "disease": reply,
            "confidence": "AI assessment",
            "advice": reply
        }

    except HTTPException:
        raise

    except requests.exceptions.Timeout as exc:
        logger.warning(
            "OpenRouter vision request timed out: %s",
            exc
        )

        raise HTTPException(
            status_code=502,
            detail=AI_SERVICE_ERROR
        ) from exc

    except requests.exceptions.RequestException as exc:
        logger.warning(
            "OpenRouter vision request failed: %s",
            exc
        )

        raise HTTPException(
            status_code=502,
            detail=AI_SERVICE_ERROR
        ) from exc

    except (ValueError, KeyError, IndexError, TypeError) as exc:
        logger.warning(
            "Malformed OpenRouter vision response: %s",
            exc
        )

        raise HTTPException(
            status_code=502,
            detail=AI_SERVICE_ERROR
        ) from exc

    except Exception as exc:
        logger.exception(
            "Unexpected disease detection error: %s",
            exc
        )

        raise HTTPException(
            status_code=502,
            detail=AI_SERVICE_ERROR
        ) from exc