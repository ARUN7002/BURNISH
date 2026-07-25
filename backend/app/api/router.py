from fastapi import APIRouter

from app.services.datahub_service import scan_dataset
from app.services.priority_service import (
    prioritize_issues,
    generate_summary,
)

router = APIRouter()

@router.get(
    "/scan",
    tags=["Governance"],
    summary="Scan datasets for governance issues",
    description="Scans enterprise datasets, detects governance issues, prioritizes them by severity, and returns a governance summary.",
)
def scan():
    # Scan all datasets
    issues = scan_dataset()

    # Sort issues by severity
    prioritized = prioritize_issues(issues)

    # Generate summary
    summary = generate_summary(prioritized)

    # Return response
    return {
        "summary": summary,
        "total_issues": len(prioritized),
        "issues": prioritized,
    }