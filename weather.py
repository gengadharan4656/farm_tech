from fastapi import APIRouter, HTTPException
import requests
import os

router = APIRouter(prefix="/api", tags=["Weather"])

# =========================================================
# OPENWEATHERMAP CONFIGURATION
# =========================================================

API_KEY = "166579a296275c15133c10a67945db7e"

# Kariyapatti, Virudhunagar, Tamil Nadu
LATITUDE = 9.4600
LONGITUDE = 78.0900


# =========================================================
# WEATHER API
# =========================================================

@router.get("/weather")
def get_weather():

    url = "https://api.openweathermap.org/data/2.5/weather"

    params = {
        "lat": LATITUDE,
        "lon": LONGITUDE,
        "appid": API_KEY,
        "units": "metric"
    }

    try:

        response = requests.get(url, params=params, timeout=10)

        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code,
                detail=f"OpenWeatherMap error: {response.text}"
            )

        data = response.json()

        temperature = round(data["main"]["temp"])
        humidity = data["main"]["humidity"]

        condition = data["weather"][0]["description"].title()

        wind_speed = round(
            data.get("wind", {}).get("speed", 0) * 3.6,
            1
        )

        # OpenWeatherMap rain data may not always exist
        rainfall = 0

        if "rain" in data:
            rainfall = data["rain"].get("1h", 0)

        return {
            "status": "success",
            "location": "Kariyapatti, Tamil Nadu",
            "temperature": temperature,
            "humidity": humidity,
            "condition": condition,
            "rainfall": rainfall,
            "wind_speed": wind_speed,
            "unit": "°C",
            "source": "OpenWeatherMap"
        }

    except requests.exceptions.RequestException as e:

        raise HTTPException(
            status_code=500,
            detail=f"Weather API connection failed: {str(e)}"
        )