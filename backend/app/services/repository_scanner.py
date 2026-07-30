from app.services.github_service import GitHubService

IMPORTANT_FILES = [
    "package.json",
    "requirements.txt",
    "pyproject.toml",
    "pom.xml",
    "build.gradle",
    "Cargo.toml",
    "go.mod",
    "Dockerfile",
    "docker-compose.yml",
    "docker-compose.yaml",
    "README.md",
    "LICENSE",
]


def scan_repository(owner, repo):

    github = GitHubService()

    repo_data = github.get_repository_metadata(owner, repo)

    tree = github.get_repository_tree(owner, repo)

    inventory = {
        "repository": repo,
        "owner": owner,
        "default_branch": repo_data["default_branch"],
        "total_files": len(tree),
        "important_files": [],
    }

    for item in tree:

        path = item["path"]

        filename = path.split("/")[-1]

        if filename in IMPORTANT_FILES:
            inventory["important_files"].append(path)

    return inventory