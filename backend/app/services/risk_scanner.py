from app.services.repository_scanner import scan_repository


def scan_repository_risks(owner, repo):
    """
    Scan repository for governance and engineering risks.
    """

    inventory = scan_repository(owner, repo)

    important_files = inventory["important_files"]

    risks = []

    # -----------------------------
    # README
    # -----------------------------
    if "README.md" not in important_files:
        risks.append("Missing README.md")

    # -----------------------------
    # LICENSE
    # -----------------------------
    if "LICENSE" not in important_files:
        risks.append("Missing LICENSE")

    # -----------------------------
    # Docker
    # -----------------------------
    if "docker-compose.yml" not in important_files:
        risks.append("Missing Docker Compose configuration")

    # -----------------------------
    # SECURITY
    # -----------------------------
    if "SECURITY.md" not in important_files:
        risks.append("Missing SECURITY.md")

    # -----------------------------
    # CODEOWNERS
    # -----------------------------
    if "CODEOWNERS" not in important_files:
        risks.append("Missing CODEOWNERS")

    return {
        "total_risks": len(risks),
        "risks": risks
    }