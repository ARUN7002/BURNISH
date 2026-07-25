from fastapi import APIRouter

from app.services.datahub_service import scan_dataset
from app.services.priority_service import (
    prioritize_issues,
    generate_summary,
)
from app.services.recommendation_service import (
    generate_all_recommendations,
)

router = APIRouter()

@router.get(
    "/scan",
    tags=["Governance"],
    summary="Scan datasets for governance issues",
    description="Scans enterprise datasets, detects governance issues, prioritizes them by severity, and returns governance recommendations.",
)
def scan():

    # Scan datasets
    issues = scan_dataset()

    # Prioritize issues
    prioritized = prioritize_issues(issues)

    # Generate summary
    summary = generate_summary(prioritized)

    # Generate AI recommendations
    recommendations = generate_all_recommendations(prioritized)

    return {
        "summary": summary,
        "total_issues": len(prioritized),
        "issues": prioritized,
        "recommendations": recommendations,
    }