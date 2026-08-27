from fastapi import APIRouter

router = APIRouter(
    prefix="/api",
    tags=["AI Insights"]
)


@router.get("/ai-insights")
def get_ai_insights():

    return {
        "status": "success",

        "alerts": 3,

        "insights": [
            {
                "type": "irrigation",
                "title": "Irrigation Alert",
                "message": "Soil moisture is low. Consider irrigation for your crop."
            },

            {
                "type": "disease",
                "title": "Disease Monitoring",
                "message": "Monitor leaves regularly for early signs of crop disease."
            },

            {
                "type": "market",
                "title": "Market Opportunity",
                "message": "Check current market prices before deciding when to sell."
            }
        ]
    }