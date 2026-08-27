from fastapi import APIRouter, UploadFile, File

router = APIRouter(
    prefix="/api",
    tags=["Disease Detection"]
)


@router.post("/diagnose")
async def diagnose(
    image: UploadFile = File(...)
):

    filename = image.filename

    return {
        "status": "success",
        "filename": filename,
        "disease": "Preliminary analysis required",
        "confidence": 0,
        "advice": (
            "Image received successfully. "
            "Connect an AI crop-disease model for "
            "automated diagnosis."
        )
    }