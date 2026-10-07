import json
from pathlib import Path
from fastapi import APIRouter, HTTPException

from app.schema.product import Product

PRODUCTS_FILE = Path(__file__).resolve().parents[1] / "data" / "products.json"

router = APIRouter(prefix="/products", tags=["Products"])


def load_products():
    with open(PRODUCTS_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


@router.get("/")
def get_products():
    return load_products()


@router.get("/{product_id}", response_model=Product)
def get_product(product_id: str):
    products = load_products()

    for product in products:
        if product["id"] == product_id:
            return product

    raise HTTPException(
        status_code=404,
        detail="Product not found"
    )