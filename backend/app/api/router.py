from fastapi import APIRouter
from app.services.datahub_service import scan_dataset

router = APIRouter()


@router.get("/")
def root():
    return {
        "project": "Burnish",
        "status": "Running",
        "version": "1.0.0"
    }


@router.get("/scan")
def scan():
    issues = scan_dataset()
    return {
        "total_issues": len(issues),
        "issues": issues
    }