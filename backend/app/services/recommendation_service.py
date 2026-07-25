from app.models.issue import GovernanceIssue
from app.models.recommendation import Recommendation


def generate_recommendation(issue: GovernanceIssue) -> Recommendation:
    """
    Generate a recommendation for a governance issue.
    """

    if issue.issue_type == "Missing Owner":
        return Recommendation(
            dataset_name=issue.dataset_name,
            issue_type=issue.issue_type,
            recommendation="Assign the appropriate Data Engineering team as owner.",
            confidence=95,
            reason="Every production dataset should have a responsible owner.",
        )

    elif issue.issue_type == "Missing Description":
        return Recommendation(
            dataset_name=issue.dataset_name,
            issue_type=issue.issue_type,
            recommendation="Add a clear business description for the dataset.",
            confidence=90,
            reason="Descriptions help analysts understand dataset purpose.",
        )

    elif issue.issue_type == "Missing Glossary":
        return Recommendation(
            dataset_name=issue.dataset_name,
            issue_type=issue.issue_type,
            recommendation="Attach relevant business glossary terms.",
            confidence=88,
            reason="Glossary terms improve business understanding.",
        )

    elif issue.issue_type == "Missing Lineage":
        return Recommendation(
            dataset_name=issue.dataset_name,
            issue_type=issue.issue_type,
            recommendation="Configure upstream and downstream lineage.",
            confidence=94,
            reason="Lineage improves traceability and impact analysis.",
        )

    return Recommendation(
        dataset_name=issue.dataset_name,
        issue_type=issue.issue_type,
        recommendation="Manual governance review required.",
        confidence=50,
        reason="No recommendation available.",
    )
def generate_all_recommendations(issues: list[GovernanceIssue]) -> list[Recommendation]:
    """
    Generate recommendations for all governance issues.
    """
    recommendations = []

    for issue in issues:
        recommendations.append(generate_recommendation(issue))

    return recommendations