# Minimum Viable Product (MVP)

---

# Project Information

**Project Name:** Burnish

**Document Version:** 1.0

**Status:** Draft

**Phase:** Phase 1 – MVP Planning

**Session:** Session 3 – MVP Feature Prioritization

**Author:** Arun J

---

# MVP Objective

The objective of the Burnish MVP is to demonstrate how an AI Governance Engineer can continuously improve metadata quality within DataHub through intelligent analysis, explainable recommendations, human approval, and responsible automation.

The MVP should deliver one complete governance workflow that is reliable, easy to understand, and suitable for a three-minute hackathon demonstration.

---

# MVP Scope

The MVP focuses on solving one clear problem:

> Detect metadata governance issues, generate AI recommendations, allow user approval, apply approved fixes, and maintain a complete audit trail.

Everything included in the MVP should directly support this workflow.

---

# Must Have Features

These features are mandatory for the MVP.

## DataHub Integration

- Connect to DataHub.
- Retrieve metadata.
- Read datasets.

---

## Metadata Scanner

Detect:

- Missing dataset owners
- Missing descriptions
- Missing glossary terms
- Incomplete metadata

---

## AI Recommendation Engine

Generate intelligent recommendations for each detected issue.

Each recommendation should include:

- Issue identified
- Suggested solution
- Reasoning
- Expected impact

---

## Approval Workflow

Users should be able to:

- Review recommendations
- Approve changes
- Reject changes

---

## Metadata Update Engine

Apply approved metadata changes back into DataHub.

---

## Audit Log

Record:

- Scan time
- Issue detected
- Recommendation
- User decision
- Applied change
- Timestamp

---

## Basic Dashboard

Display:

- Number of datasets scanned
- Issues detected
- Recommendations generated
- Pending approvals
- Completed updates

---

# Should Have Features

These features improve the experience but are not required.

- Confidence score for recommendations
- Filtering by issue type
- Search functionality
- Metadata quality score
- Scan history
- Export audit log

---

# Could Have Features

These features are desirable if time permits.

- Scheduled scans
- Email notifications
- Slack or Microsoft Teams integration
- Governance trend charts
- AI summary report
- Domain-level analytics

---

# Won't Have (Version 2)

These features are intentionally excluded from the MVP.

- Multi-company support
- Multi-agent collaboration
- Kubernetes deployment
- Enterprise RBAC
- Mobile application
- Real-time collaboration
- Advanced governance analytics
- Machine learning model training

These features belong to future versions of Burnish.

---

# MVP User Journey

The complete MVP experience should follow this sequence.

```
Open Burnish

↓

Connect to DataHub

↓

Scan Metadata

↓

Detect Governance Issues

↓

Generate AI Recommendations

↓

Display Reasoning

↓

User Reviews Results

↓

Approve Changes

↓

Update DataHub

↓

Create Audit Log

↓

Display Success
```

---

# MVP Success Criteria

The MVP will be successful if a judge can complete the entire workflow within three minutes and clearly understand:

- The governance problem.
- How Burnish identifies issues.
- Why the AI generated each recommendation.
- How human approval works.
- How DataHub is updated.
- How governance actions are recorded.

---

# Features Deferred to Version 2

Future releases may include:

- Governance analytics dashboard
- Organizational policy learning
- Predictive governance
- Multiple AI agents
- Cross-domain governance
- Enterprise integrations
- Workflow automation
- Team collaboration

---

# Key Takeaways

- The MVP focuses on one complete governance workflow.
- Must Have features receive the highest development priority.
- Should Have and Could Have features are implemented only if time permits.
- Version 2 features are intentionally excluded to keep the MVP focused.