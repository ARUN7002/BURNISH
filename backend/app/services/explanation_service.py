from app.models.issue import GovernanceIssue


def generate_explanation(issue: GovernanceIssue) -> str:
    """
    Generate a human-friendly explanation for a governance issue.
    """

    if issue.issue_type == "Missing Owner":
        return (
            f"The dataset '{issue.dataset_name}' does not have an assigned owner. "
            "Without ownership, accountability for data quality, governance, and incident response is unclear."
        )

    elif issue.issue_type == "Missing Description":
        return (
            f"The dataset '{issue.dataset_name}' has no business description. "
            "This makes it difficult for analysts and stakeholders to understand its purpose."
        )

    elif issue.issue_type == "Missing Glossary":
        return (
            f"The dataset '{issue.dataset_name}' has no linked glossary terms. "
            "Business users may struggle to understand important terminology and definitions."
        )

    elif issue.issue_type == "Missing Lineage":
        return (
            f"The dataset '{issue.dataset_name}' has no lineage information. "
            "Without lineage, tracing data sources and downstream impacts becomes difficult."
        )

    return (
        f"The dataset '{issue.dataset_name}' contains a governance issue "
        "that requires manual investigation."
    )