from pprint import pprint

from app.services.report_generator import generate_report

report = generate_report(
    "ARUN7002",
    "BURNISH"
)

pprint(report)