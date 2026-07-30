from app.services.github_service import GitHubService


def analyze_dependencies(owner, repo):
    """
    Download requirements.txt and extract dependencies.
    """

    github = GitHubService()

    dependencies = []

    try:

        file = github.get_file_content(
            owner,
            repo,
            "backend/requirements.txt"
        )

        content = file["content"]

        for line in content.splitlines():

            line = line.strip()

            if not line:
                continue

            if line.startswith("#"):
                continue

            if "==" in line:

                package, version = line.split("==", 1)

                dependencies.append(
                    {
                        "name": package,
                        "version": version
                    }
                )

            else:

                dependencies.append(
                    {
                        "name": line,
                        "version": "Unknown"
                    }
                )

    except Exception as e:

        print("Dependency Analysis Error:", e)

    return {
        "total_dependencies": len(dependencies),
        "dependencies": dependencies
    }