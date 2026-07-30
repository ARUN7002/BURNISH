from app.services.github_service import GitHubService

github = GitHubService()

file = github.get_file_content(
    "ARUN7002",
    "BURNISH",
    "backend/requirements.txt"
)

print(file)