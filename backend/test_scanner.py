from app.services.repository_scanner import scan_repository
from app.services.technology_detector import detect_technologies

inventory = scan_repository(
    "ARUN7002",
    "BURNISH"
)

technologies = detect_technologies(inventory)

print("Repository Inventory")
print(inventory)

print()

print("Detected Technologies")
print(technologies)