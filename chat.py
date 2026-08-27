from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/api",
    tags=["AI Chat"]
)


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
def chat(request: ChatRequest):

    message = request.message.lower().strip()


    # ==========================================
    # FERTILIZER
    # ==========================================

    if any(word in message for word in [
        "fertilizer",
        "fertiliser",
        "manure",
        "npk",
        "urea"
    ]):

        reply = (
            "For fertilizer management, use soil-test-based "
            "recommendations. For paddy, balanced nutrients "
            "such as nitrogen, phosphorus and potassium are "
            "important. Avoid excessive fertilizer application."
        )


    # ==========================================
    # RAIN / RAINY SEASON
    # ==========================================

    elif any(word in message for word in [
        "rain",
        "rainy",
        "monsoon",
        "heavy rain",
        "flood"
    ]):

        reply = (
            "During heavy rain, maintain proper field drainage "
            "and avoid excess irrigation. Monitor crops for "
            "waterlogging and fungal diseases after rainfall."
        )


    # ==========================================
    # WATER / IRRIGATION
    # ==========================================

    elif any(word in message for word in [
        "water",
        "irrigation",
        "watering",
        "moisture"
    ]):

        reply = (
            "Irrigate according to soil moisture and crop stage. "
            "Avoid unnecessary watering and check the field "
            "regularly for water stress."
        )


    # ==========================================
    # DISEASE
    # ==========================================

    elif any(word in message for word in [
        "disease",
        "infection",
        "fungus",
        "fungal",
        "leaf disease"
    ]):

        reply = (
            "Please upload a clear image of the affected leaf "
            "using the Disease Detection feature. The system "
            "can then send the image to the diagnosis service "
            "for analysis."
        )


    # ==========================================
    # PEST
    # ==========================================

    elif any(word in message for word in [
        "pest",
        "insect",
        "bug",
        "worm",
        "caterpillar"
    ]):

        reply = (
            "Monitor the crop regularly for insects and pest "
            "damage. Remove heavily affected plant parts where "
            "appropriate and use suitable integrated pest "
            "management practices."
        )


    # ==========================================
    # MARKET / SELLING
    # ==========================================

    elif any(word in message for word in [
        "market",
        "price",
        "sell",
        "selling",
        "buyer",
        "profit"
    ]):

        reply = (
            "You can use the Digital Krishi Officer marketplace "
            "to explore agricultural products and market-related "
            "services. Compare available prices before making "
            "selling or purchasing decisions."
        )


    # ==========================================
    # PADDY / RICE
    # ==========================================

    elif any(word in message for word in [
        "paddy",
        "rice"
    ]):

        reply = (
            "For paddy cultivation, monitor soil moisture, "
            "weather conditions, pests and diseases regularly. "
            "Use balanced nutrient management and proper field "
            "drainage."
        )


    # ==========================================
    # TOMATO
    # ==========================================

    elif "tomato" in message:

        reply = (
            "For tomato cultivation, maintain suitable soil "
            "moisture, provide adequate sunlight and monitor "
            "regularly for pests and diseases."
        )


    # ==========================================
    # WEATHER
    # ==========================================

    elif any(word in message for word in [
        "weather",
        "temperature",
        "climate",
        "forecast"
    ]):

        reply = (
            "Check the Weather section of Digital Krishi Officer "
            "for current conditions and use the forecast to "
            "plan irrigation, spraying and other farm activities."
        )


    # ==========================================
    # GENERAL FARMING
    # ==========================================

    elif any(word in message for word in [
        "crop",
        "farming",
        "farmer",
        "agriculture",
        "farm"
    ]):

        reply = (
            "I can help with crop management, irrigation, "
            "fertilizers, pests, diseases, weather and "
            "agricultural marketplace information."
        )


    # ==========================================
    # DEFAULT
    # ==========================================

    else:

        reply = (
            "I am your Digital Krishi Officer. You can ask me "
            "about crops, fertilizers, irrigation, rain, pests, "
            "diseases, weather, market prices or farming."
        )


    return {
        "status": "success",
        "message": request.message,
        "reply": reply
    }