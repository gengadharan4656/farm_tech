from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from datetime import datetime

from database import Base


class Farmer(Base):

    __tablename__ = "farmers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(20), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    location = Column(String(100))
    created_at = Column(DateTime, default=datetime.utcnow)


class Product(Base):

    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    category = Column(String(100))
    price = Column(Float, nullable=False)
    unit = Column(String(50))
    description = Column(Text)
    seller = Column(String(100))


class Order(Base):

    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    farmer_phone = Column(String(20))
    product_name = Column(String(150))
    quantity = Column(Integer, default=1)
    total_price = Column(Float)
    status = Column(String(50), default="Pending")
    created_at = Column(DateTime, default=datetime.utcnow)


class CartItem(Base):

    __tablename__ = "cart_items"

    id = Column(Integer, primary_key=True, index=True)
    farmer_phone = Column(String(20))
    product_id = Column(Integer)
    quantity = Column(Integer, default=1)