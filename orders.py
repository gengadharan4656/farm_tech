from fastapi import APIRouter

router = APIRouter(
    prefix="/api",
    tags=["Orders"]
)


@router.get("/orders")
def get_orders():

    return [
        {
            "id": 1,
            "product_name": "Premium Paddy Seeds",
            "quantity": 2,
            "total_price": 1200,
            "status": "Delivered"
        },
        {
            "id": 2,
            "product_name": "Organic Neem Fertilizer",
            "quantity": 1,
            "total_price": 450,
            "status": "Processing"
        },
        {
            "id": 3,
            "product_name": "Tomato Seeds",
            "quantity": 3,
            "total_price": 600,
            "status": "Shipped"
        }
    ]