from pydantic import BaseModel


class Rating(BaseModel):
    stars: float
    count: int


class Product(BaseModel):
    id: str
    image: str
    name: str
    rating: Rating
    price: int
    keywords: list[str]