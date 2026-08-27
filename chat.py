import logging
import os
from typing import Literal

import requests
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

load_dotenv()

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["AI Chat"])

# OpenRouter configuration
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
AI_MODEL = os.getenv("OPENROUTER_MODEL", "google/gemini-2.5-flash-lite")

MAX_HISTORY_MESSAGES = 12

AI_SERVICE_ERROR = (
    "Sorry, I couldn't connect to the AI service right now. "
    "Please try again."
)


SYSTEM_PROMPT = """
You are Krishi AI, an agriculture-focused assistant for the
Farm-Tech / Digital Krishi Officer app.

Your primary purpose is to help farmers with practical, accurate,
clear, and easy-to-understand agricultural guidance.

You can help with:

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
- Vegetables
- Fruits
- Horticulture
- Soil management
- Seed selection and treatment
- Sowing
- Transplanting
- Irrigation
- Drip irrigation
- Fertilizers
- Organic farming
- Integrated nutrient management
- Pest management
- Plant diseases
- Weeds
- Nutrient deficiencies
- Weather-based farming decisions
- Harvesting
- Post-harvest handling
- Storage
- Farm machinery
- Government agricultural schemes
- Subsidies
- Agricultural markets
- Farm profitability
- Sustainable farming
- Climate-resilient agriculture

LANGUAGE RULE:

Always answer in the same language used by the farmer's
CURRENT question.

Examples:

English question → English answer.
Tamil question → Tamil answer.
Hindi question → Hindi answer.
Telugu question → Telugu answer.
Kannada question → Kannada answer.
Malayalam question → Malayalam answer.

Support other Indian languages whenever possible.

If the farmer uses Tanglish or a mixed English + Indian
language style, respond naturally in the same mixed style.

Do NOT translate the question into English unless necessary.

Do NOT announce which language you detected.

IMPORTANT:
The language of the CURRENT user message has priority over
the language used earlier in the conversation.

AGRICULTURE ACCURACY:

Give practical and farmer-friendly answers.

Do not invent:
- Current market prices
- Government subsidy amounts
- Government rules
- Statistics
- Pesticide names
- Fertilizer dosages
- Chemical application rates
- Product recommendations

If current or location-specific information is required,
tell the farmer to verify it with:
- Local Agriculture Department
- KVK
- Agricultural University
- Official Government source
- Local market committee
- Approved product label

PESTICIDE / FUNGICIDE / HERBICIDE SAFETY:

Prefer:
- Integrated Pest Management
- Cultural practices
- Biological methods
- Mechanical methods
- Preventive practices

If chemical treatment is discussed, advise the farmer to
follow the locally approved product label and recommended
dosage.

If important information is missing, ask a short clarifying
question about:
- Crop
- Crop age / growth stage
- Location
- Symptoms
- Pest or disease appearance
- Soil condition
- Recent weather

IMAGE DIAGNOSIS:

If the farmer asks you to identify a crop disease from an
image but no image is available, tell them to upload a clear
crop image using the Disease Detection feature.

Never pretend to analyze an image that was not provided.

ANSWER STYLE:

Keep answers clear, practical, and useful for ordinary farmers.

Prefer:
1. Direct answer
2. Important steps
3. Precautions
4. Clarifying question if needed

Use simple language and avoid unnecessarily complicated
scientific terminology.

When giving agricultural recommendations, clearly distinguish
between general guidance and advice that requires local
agricultural verification.
""".strip()


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=4000)


class ChatRequest(BaseModel):
    message: str = Field(default="", max_length=4000)
    history: list[ChatMessage] = Field(default_factory=list)


def _build_messages(request: ChatRequest) -> list[dict[str, str]]:
    """
    Convert the frontend conversation history into the
    OpenRouter/OpenAI-compatible message format.
    """

    history = []

    for item in request.history[-MAX_HISTORY_MESSAGES:]:
        content = item.content.strip()

        if not content:
            continue

        history.append(
            {
                "role": item.role,
                "content": content,
            }
        )

    return [
        {
            "role": "system",
            "content": SYSTEM_PROMPT,
        },
        *history,
        {
            "role": "user",
            "content": request.message.strip(),
        },
    ]


@router.post("/chat")
def chat(request: ChatRequest):
    """
    Agriculture AI chatbot endpoint.

    Frontend sends:
    {
        "message": "...",
        "history": []
    }

    Returns:
    {
        "reply": "..."
    }
    """

    message = request.message.strip()

    if not message:
        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty.",
        )

    # Read OpenRouter API key from .env
    api_key = os.getenv("OPENROUTER_API_KEY")

    if not api_key:
        logger.error("OPENROUTER_API_KEY is not configured.")

        raise HTTPException(
            status_code=503,
            detail="AI service is not configured on the server.",
        )

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",

        # Optional OpenRouter attribution headers
        "HTTP-Referer": "http://localhost:8000",
        "X-Title": "Farm-Tech Krishi AI",
    }

    payload = {
        "model": AI_MODEL,
        "messages": _build_messages(request),
        "temperature": 0.4,
        "max_tokens": 700,
    }

    try:
        response = requests.post(
            OPENROUTER_URL,
            headers=headers,
            json=payload,
            timeout=30,
        )

        # Log the actual OpenRouter error during development.
        # Never log the API key.
        if not response.ok:
            logger.error(
                "OpenRouter API error - status=%s response=%s",
                response.status_code,
                response.text[:2000],
            )

        response.raise_for_status()

        data = response.json()

        choices = data.get("choices", [])

        if not choices:
            logger.error(
                "OpenRouter response contains no choices: %s",
                data,
            )

            raise HTTPException(
                status_code=502,
                detail=AI_SERVICE_ERROR,
            )

        message_data = choices[0].get("message", {})

        reply = message_data.get("content", "")

        if isinstance(reply, list):
            # Some providers may return structured content.
            reply = "".join(
                part.get("text", "")
                for part in reply
                if isinstance(part, dict)
            )

        reply = str(reply).strip()

        if not reply:
            logger.error(
                "OpenRouter response did not contain usable text."
            )

            raise HTTPException(
                status_code=502,
                detail=AI_SERVICE_ERROR,
            )

        return {
            "reply": reply,
        }

    except HTTPException:
        raise

    except requests.exceptions.Timeout as exc:
        logger.warning(
            "OpenRouter request timed out: %s",
            exc,
        )

        raise HTTPException(
            status_code=502,
            detail=AI_SERVICE_ERROR,
        ) from exc

    except requests.exceptions.RequestException as exc:
        logger.warning(
            "OpenRouter request failed: %s",
            exc,
        )

        raise HTTPException(
            status_code=502,
            detail=AI_SERVICE_ERROR,
        ) from exc

    except (ValueError, KeyError, IndexError, TypeError) as exc:
        logger.warning(
            "Malformed OpenRouter response: %s",
            exc,
        )

        raise HTTPException(
            status_code=502,
            detail=AI_SERVICE_ERROR,
        ) from exc

    except Exception as exc:
        logger.exception(
            "Unexpected AI chatbot error: %s",
            exc,
        )

        raise HTTPException(
            status_code=502,
            detail=AI_SERVICE_ERROR,
        ) from exc