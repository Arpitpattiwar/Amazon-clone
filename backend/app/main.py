from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.products import router as products_router
from app.routes.orders import router as orders_router

app = FastAPI(
    title="Amazon Clone",
    description="Backend for the Amazon Clone",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return{
        "message": "Amazon clone backend is running"
    }

@app.get("/health")
def health_check():
    return {
        "status": "ok"
    }

app.include_router(products_router)
app.include_router(orders_router)