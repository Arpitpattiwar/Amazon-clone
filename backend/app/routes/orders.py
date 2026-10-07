import json
import uuid
from datetime import datetime, timedelta
from pathlib import Path

from fastapi import APIRouter, HTTPException

from app.schema.order import CreateOrderRequest, Order, OrderProduct


router = APIRouter(prefix="/orders", tags=["Orders"])

ORDERS_FILE = Path(__file__).resolve().parents[1] / "data" / "orders.json"
DELIVERY_OPTIONS_FILE = Path(__file__).resolve().parents[1] / "data" / "delivery_options.json"
PRODUCTS_FILE = Path(__file__).resolve().parents[1] / "data" / "products.json"


def load_json(file_path: Path):
    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)


def save_json(file_path: Path, data):
    with open(file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=2)


def load_products():
    return load_json(PRODUCTS_FILE)


def load_orders():
    return load_json(ORDERS_FILE)


def load_delivery_options():
    return load_json(DELIVERY_OPTIONS_FILE)


@router.post("/", response_model=Order)
def create_order(request: CreateOrderRequest):
    if not request.cart:
        raise HTTPException(
            status_code=400,
            detail="Cart is empty"
        )

    products = load_products()
    delivery_options = load_delivery_options()

    order_products = []
    total_price = 0

    for cart_item in request.cart:

        # Find product
        product = next(
            (
                product
                for product in products
                if product["id"] == cart_item.productId
            ),
            None
        )

        if product is None:
            raise HTTPException(
                status_code=404,
                detail=f"Product {cart_item.productId} not found"
            )

        # Find delivery option
        delivery_option = next(
            (
                option
                for option in delivery_options
                if option["id"] == cart_item.deliveryOptionId
            ),
            None
        )

        if delivery_option is None:
            raise HTTPException(
                status_code=400,
                detail=(
                    f"Invalid delivery option "
                    f"{cart_item.deliveryOptionId}"
                )
            )

        # Calculate product total
        total_price += (
            product["price"] * cart_item.quantity
        )

        # Calculate delivery date
        delivery_date = (
            datetime.now()
            + timedelta(days=delivery_option["deliveryDays"])
        ).isoformat()

        order_products.append(
            OrderProduct(
                productId=cart_item.productId,
                quantity=cart_item.quantity,
                deliveryOptionId=cart_item.deliveryOptionId,
                deliveryDate=delivery_date,
            )
        )

    order = Order(
        id=str(uuid.uuid4()),
        orderDate=datetime.now().isoformat(),
        totalPrice=total_price,
        products=order_products,
    )

    orders = load_orders()
    orders.insert(0, order.model_dump())

    save_json(ORDERS_FILE, orders)

    return order


@router.get("/", response_model=list[Order])
def get_orders():
    return load_orders()


@router.get("/{order_id}", response_model=Order)
def get_order(order_id: str):
    orders = load_orders()

    for order in orders:
        if order["id"] == order_id:
            return order

    raise HTTPException(
        status_code=404,
        detail="Order not found"
    )