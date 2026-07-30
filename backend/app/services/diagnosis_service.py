RISK_DATABASE = {
    "Missing SECURITY.md": {
        "severity": "High",
        "explanation":
        "The repository does not define a security disclosure policy. Vulnerabilities may not be reported responsibly."
    },

    "Missing CODEOWNERS": {
        "severity": "Medium",
        "explanation":
        "Repository ownership is undefined. Code review responsibility is unclear."
    },

    "Missing README.md": {
        "severity": "Medium",
        "explanation":
        "Project documentation is missing."
    },

    "Missing LICENSE": {
        "severity": "Low",
        "explanation":
        "Repository licensing information is missing."
    },

    "Missing Docker Compose configuration": {
        "severity": "Low",
        "explanation":
        "Deployment automation configuration is unavailable."
    }
}


def diagnose_risks(risks):

    diagnosis = []

    for risk in risks:

        info = RISK_DATABASE.get(
            risk,
            {
                "severity": "Unknown",
                "explanation": "No explanation available."
            }
        )

        diagnosis.append({

            "risk": risk,

            "severity": info["severity"],

            "explanation": info["explanation"]

        })

    return diagnosis