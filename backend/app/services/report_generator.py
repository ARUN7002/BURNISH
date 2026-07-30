from app.services.repository_scanner import scan_repository
from app.services.technology_detector import detect_technologies
from app.services.dependency_analyzer import analyze_dependencies
from app.services.risk_scanner import scan_repository_risks
from app.services.diagnosis_service import diagnose_risks
from app.services.recommendation_engine import generate_recommendations


def generate_report(owner, repo):

    # Repository Inventory
    inventory = scan_repository(owner, repo)

    # Technology Detection
    technologies = detect_technologies(inventory)

    # Dependency Analysis
    dependencies = analyze_dependencies(owner, repo)

    # Risk Detection
    risks = scan_repository_risks(owner, repo)

    # AI Diagnosis
    diagnosis = diagnose_risks(
        risks["risks"]
    )

    # Recommendations
    recommendations = generate_recommendations(
        diagnosis
    )

    report = {

        "repository": inventory,

        "technologies": technologies,

        "dependencies": dependencies,

        "risks": risks,

        "diagnosis": diagnosis,

        "recommendations": recommendations

    }

    return report