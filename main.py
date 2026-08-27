from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
from routers import products
from routers import weather
from routers import insights
from routers import chat
from routers import disease
from routers import orders


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Digital Krishi Officer API",
    description="AI Agriculture + E-Commerce Backend",
    version="1.0.0"
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Include routers
app.include_router(products.router)
app.include_router(weather.router)
app.include_router(insights.router)
app.include_router(chat.router)
app.include_router(disease.router)
app.include_router(orders.router)


@app.get("/")
def home():
    return {
        "status": "success",
        "message": "Digital Krishi Officer Backend is Running"
    }


@app.get("/api/health")
def health():
    return {
        "status": "success",
        "message": "Backend connection successful"
    }