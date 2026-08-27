from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import Product

router = APIRouter(prefix="/api", tags=["Products"])


@router.get("/products")
def get_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()

    return [
        {
            "id": p.id,
            "name": p.name,
            "category": p.category,
            "price": p.price,
            "unit": p.unit,
            "description": p.description,
            "seller": p.seller
        }
        for p in products
    ]