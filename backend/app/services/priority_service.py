from app.models.issue import GovernanceIssue

SEVERITY_SCORE = {
    "Critical": 4,
    "High": 3,
    "Medium": 2,
    "Low": 1,
}


def prioritize_issues(issues: list[GovernanceIssue]) -> list[GovernanceIssue]:
    """
    Sort governance issues from highest severity to lowest severity.
    """
    return sorted(
        issues,
        key=lambda issue: SEVERITY_SCORE.get(issue.severity, 0),
        reverse=True,
    )


def generate_summary(issues: list[GovernanceIssue]) -> dict:
    summary = {
        "critical": 0,
        "high": 0,
        "medium": 0,
        "low": 0,
    }

    for issue in issues:
        summary[issue.severity.lower()] += 1

    return summary