def detect_technologies(inventory):
    """
    Detect technologies from repository inventory.
    """

    files = inventory.get("important_files", [])

    technologies = {
        "language": [],
        "framework": [],
        "database": [],
        "package_manager": []
    }

    # ---------- Python ----------
    if "requirements.txt" in files:
        technologies["language"].append("Python")
        technologies["package_manager"].append("pip")

    # ---------- Node ----------
    if "package.json" in files:
        technologies["language"].append("JavaScript")
        technologies["package_manager"].append("npm")

    # ---------- Java ----------
    if "pom.xml" in files:
        technologies["language"].append("Java")
        technologies["package_manager"].append("Maven")

    if "build.gradle" in files:
        technologies["language"].append("Java")
        technologies["package_manager"].append("Gradle")

    # ---------- Docker ----------
    if "docker-compose.yml" in files:
        technologies["framework"].append("Docker Compose")

    if "Dockerfile" in files:
        technologies["framework"].append("Docker")

    return technologies