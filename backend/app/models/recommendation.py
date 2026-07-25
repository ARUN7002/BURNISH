from pydantic import BaseModel


class Recommendation(BaseModel):
    dataset_name: str
    issue_type: str

    recommendation: str

    confidence: int

    reason: str

    ai_generated: bool = True

    explanation_version: str = "v1.0"