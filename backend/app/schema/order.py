from pydantic import BaseModel

class CartItem(BaseModel):
    productId: str
    quantity: int
    deliveryOptionId: str


class CreateOrderRequest(BaseModel):
    cart: list[CartItem]


class OrderProduct(BaseModel):
    productId: str
    quantity: int
    deliveryOptionId: str
    deliveryDate: str


class Order(BaseModel):
    id: str
    orderDate: str
    totalPrice: float
    products: list[OrderProduct]