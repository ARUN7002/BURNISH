from app.services.github_service import GitHubService

github = GitHubService()

repo = github.get_repository_metadata(
    "ARUN7002",
    "BURNISH"
)

print(repo["name"])
print(repo["full_name"])
print(repo["default_branch"])
print(repo["language"])
print(repo["stargazers_count"])