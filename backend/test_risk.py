from app.services.risk_scanner import scan_repository_risks

result = scan_repository_risks(
    "ARUN7002",
    "BURNISH"
)

print(result)