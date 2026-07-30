from app.services.risk_scanner import scan_repository_risks
from app.services.diagnosis_service import diagnose_risks
from app.services.recommendation_engine import generate_recommendations

risks = scan_repository_risks(
    "ARUN7002",
    "BURNISH"
)

diagnosis = diagnose_risks(
    risks["risks"]
)

recommendations = generate_recommendations(
    diagnosis
)

print(recommendations)