import os
import base64
import requests

GITHUB_API = "https://api.github.com"


class GitHubService:

    def __init__(self):
        self.token = os.getenv("GITHUB_TOKEN")

        if not self.token:
            raise ValueError("GITHUB_TOKEN environment variable is not set.")

        self.headers = {
            "Authorization": f"Bearer {self.token}",
            "Accept": "application/vnd.github+json"
        }

    # ----------------------------------------------------
    # Get repository metadata
    # ----------------------------------------------------
    def get_repository_metadata(self, owner, repo):

        url = f"{GITHUB_API}/repos/{owner}/{repo}"

        response = requests.get(
            url,
            headers=self.headers
        )

        response.raise_for_status()

        return response.json()

    # ----------------------------------------------------
    # Get complete repository tree
    # ----------------------------------------------------
    def get_repository_tree(self, owner, repo):

        metadata = self.get_repository_metadata(owner, repo)

        default_branch = metadata["default_branch"]

        url = (
            f"{GITHUB_API}/repos/"
            f"{owner}/{repo}/git/trees/"
            f"{default_branch}?recursive=1"
        )

        response = requests.get(
            url,
            headers=self.headers
        )

        response.raise_for_status()

        return response.json().get("tree", [])

    # ----------------------------------------------------
    # Get contents of a file
    # ----------------------------------------------------
    def get_file_content(self, owner, repo, path):

        url = (
            f"{GITHUB_API}/repos/"
            f"{owner}/{repo}/contents/{path}"
        )

        response = requests.get(
            url,
            headers=self.headers
        )

        response.raise_for_status()

        data = response.json()

        content = base64.b64decode(
            data["content"]
        ).decode("utf-8")

        return {
            "path": data["path"],
            "content": content
        }