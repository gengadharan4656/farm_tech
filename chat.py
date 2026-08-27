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

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
AI_MODEL = os.getenv("OPENROUTER_MODEL", "deepseek/deepseek-chat-v3.1:free")
MAX_HISTORY_MESSAGES = 12
AI_SERVICE_ERROR = "Sorry, I couldn't connect to the AI service right now. Please try again."

SYSTEM_PROMPT = """
You are Krishi AI, an agriculture-focused assistant for the Farm-Tech / Digital Krishi Officer app.
Help ordinary farmers with practical, clear advice about paddy/rice, wheat, maize, millets, pulses,
sugarcane, cotton, groundnut, banana, coconut, tomato, onion, chilli, brinjal, vegetables, fruits,
horticulture, soil management, seed selection and treatment, sowing, transplanting, irrigation,
drips, fertilizers, organic farming, integrated nutrient management, pests, diseases, weeds,
nutrient deficiencies, weather-based farm decisions, harvesting, post-harvest handling, storage,
farm machinery, government schemes, subsidies, markets, profitability, sustainable farming, and
climate-resilient agriculture.

Language rule: detect the language of the user's current question and answer in the same language.
Support English, Tamil, Hindi, Telugu, Kannada, Malayalam, and other Indian languages when possible.
For Tanglish or mixed English plus an Indian language, respond naturally in the dominant language or
same mixed style. Do not announce language detection unless it is needed.

Accuracy and safety rules: do not invent current market prices, subsidy amounts, pesticide names,
chemical/fertilizer dosages, government rules, or statistics. If current/local information is needed,
tell the farmer to verify with the local agriculture department, KVK, agricultural university,
official government source, market committee, or the approved product label. For pesticide,
fungicide, and herbicide questions, prefer IPM, cultural, and biological methods, ask a short
clarifying question when crop/pest/stage/location details are missing, and always advise following
locally approved labels. If asked to diagnose an image but no image was provided, ask the user to
upload a clear crop image in the Disease Detection feature. Do not pretend to analyze images.
""".strip()


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=4000)


class ChatRequest(BaseModel):
    message: str = Field(default="", max_length=4000)
    history: list[ChatMessage] = Field(default_factory=list)


def _build_messages(request: ChatRequest) -> list[dict[str, str]]:
    history = [
        {"role": item.role, "content": item.content.strip()}
        for item in request.history[-MAX_HISTORY_MESSAGES:]
        if item.content.strip()
    ]
    return [
        {"role": "system", "content": SYSTEM_PROMPT},
        *history,
        {"role": "user", "content": request.message.strip()},
    ]


@router.post("/chat")
def chat(request: ChatRequest):
    message = request.message.strip()
    if not message:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise HTTPException(status_code=503, detail="AI service is not configured on the server.")

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
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
        response = requests.post(OPENROUTER_URL, headers=headers, json=payload, timeout=30)
        response.raise_for_status()
        data = response.json()
        reply = data.get("choices", [{}])[0].get("message", {}).get("content", "").strip()
    except requests.exceptions.RequestException as exc:
        logger.warning("OpenRouter request failed: %s", exc)
        raise HTTPException(status_code=502, detail=AI_SERVICE_ERROR) from exc
    except (ValueError, KeyError, IndexError, TypeError) as exc:
        logger.warning("Malformed OpenRouter response: %s", exc)
        raise HTTPException(status_code=502, detail=AI_SERVICE_ERROR) from exc

    if not reply:
        logger.warning("OpenRouter response did not include a usable reply")
        raise HTTPException(status_code=502, detail=AI_SERVICE_ERROR)

    return {"reply": reply}
