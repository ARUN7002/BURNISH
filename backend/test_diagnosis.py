from app.services.risk_scanner import scan_repository_risks
from app.services.diagnosis_service import diagnose_risks

result = scan_repository_risks(
    "ARUN7002",
    "BURNISH"
)

diagnosis = diagnose_risks(
    result["risks"]
)

print(diagnosis)