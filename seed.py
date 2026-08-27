from database import SessionLocal, engine, Base
from models import Product

Base.metadata.create_all(bind=engine)

db = SessionLocal()

products = [
    Product(
        name="Premium Paddy Seeds",
        category="Seeds",
        price=850,
        unit="5 kg",
        description="High quality paddy seeds for farmers",
        seller="Agri Seeds India"
    ),
    Product(
        name="Organic Neem Fertilizer",
        category="Fertilizer",
        price=450,
        unit="5 kg",
        description="Natural organic fertilizer",
        seller="Green Farm"
    ),
    Product(
        name="Neem Oil",
        category="Pesticide",
        price=320,
        unit="1 L",
        description="Natural crop protection solution",
        seller="Eco Agro"
    ),
    Product(
        name="Tomato Seeds",
        category="Seeds",
        price=250,
        unit="100 g",
        description="High yield tomato seeds",
        seller="Farm Seeds"
    ),
    Product(
        name="Bio Pesticide",
        category="Crop Protection",
        price=550,
        unit="1 L",
        description="Biological crop protection product",
        seller="BioGrow"
    )
]

for product in products:
    db.add(product)

db.commit()
db.close()

print("Sample products added successfully!")