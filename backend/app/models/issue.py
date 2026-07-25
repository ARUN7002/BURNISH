from pydantic import BaseModel


class GovernanceIssue(BaseModel):
    dataset_name: str
    issue_type: str
    severity: str
    message: str