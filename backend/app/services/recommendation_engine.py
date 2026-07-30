RECOMMENDATION_DATABASE = {

    "Missing SECURITY.md":
        "Create a SECURITY.md file that explains how security vulnerabilities should be reported.",

    "Missing CODEOWNERS":
        "Create a CODEOWNERS file assigning repository ownership and reviewers.",

    "Missing README.md":
        "Add a README describing installation, usage, architecture, and contribution guidelines.",

    "Missing LICENSE":
        "Add an open-source license such as MIT or Apache 2.0.",

    "Missing Docker Compose configuration":
        "Provide a docker-compose.yml for reproducible deployment."
}


def generate_recommendations(diagnosis):

    recommendations = []

    for item in diagnosis:

        recommendation = RECOMMENDATION_DATABASE.get(

            item["risk"],

            "No recommendation available."

        )

        recommendations.append({

            "risk": item["risk"],

            "severity": item["severity"],

            "recommendation": recommendation

        })

    return recommendations