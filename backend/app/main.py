from fastapi import FastAPI
from app.api.router import router

app = FastAPI(
    title="Burnish",
    version="1.0.0",
    description="Autonomous AI Governance Engineer for DataHub"
)

app.include_router(router)