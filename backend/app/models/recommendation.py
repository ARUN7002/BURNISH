from pydantic import BaseModel


class Recommendation(BaseModel):
    dataset_name: str

    issue_type: str

    recommendation: str

    confidence: int

    reason: str