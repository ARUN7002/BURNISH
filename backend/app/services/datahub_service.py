from app.models.issue import GovernanceIssue


def scan_dataset():
    issues = []

    datasets = [
        {
            "name": "sales.transactions",
            "owner": None,
            "description": "",
            "glossary": [],
            "lineage": None,
        },
        {
            "name": "finance.customers",
            "owner": "Finance Team",
            "description": "",
            "glossary": [],
            "lineage": None,
        },
        {
            "name": "marketing.campaigns",
            "owner": None,
            "description": "Marketing campaign performance",
            "glossary": [],
            "lineage": None,
        },
        {
            "name": "inventory.products",
            "owner": "Inventory Team",
            "description": "Product inventory",
            "glossary": ["Product"],
            "lineage": None,
        },
        {
            "name": "hr.employees",
            "owner": None,
            "description": "",
            "glossary": [],
            "lineage": "Available",
        },
    ]

    for dataset in datasets:

        if dataset["owner"] is None:
            issues.append(
                GovernanceIssue(
                    dataset_name=dataset["name"],
                    issue_type="Missing Owner",
                    severity="High",
                    message="Dataset has no assigned owner."
                )
            )

        if dataset["description"] == "":
            issues.append(
                GovernanceIssue(
                    dataset_name=dataset["name"],
                    issue_type="Missing Description",
                    severity="Medium",
                    message="Dataset description is empty."
                )
            )

        if len(dataset["glossary"]) == 0:
            issues.append(
                GovernanceIssue(
                    dataset_name=dataset["name"],
                    issue_type="Missing Glossary",
                    severity="Low",
                    message="No glossary terms are attached."
                )
            )

        if dataset["lineage"] is None:
            issues.append(
                GovernanceIssue(
                    dataset_name=dataset["name"],
                    issue_type="Missing Lineage",
                    severity="High",
                    message="Dataset lineage is unavailable."
                )
            )

    return issues