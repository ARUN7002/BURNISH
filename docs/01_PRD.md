# Product Requirements Document (PRD)

---

# Project Information

**Project Name:** Burnish

**Tagline:** Polishing Enterprise Metadata with Autonomous Intelligence

**Document Version:** 1.0

**Status:** Draft

**Phase:** Phase 1 – MVP Planning

**Session:** Session 1 – Product Requirements

**Author:** Arun J

---

# Product Overview

Burnish is an Autonomous AI Governance Engineer built for DataHub.

It continuously scans enterprise metadata, detects governance gaps, generates explainable recommendations, and assists governance teams in maintaining high-quality metadata through responsible AI and human approval workflows.

Burnish is designed to complement DataHub by reducing repetitive governance tasks while ensuring transparency, accountability, and trust.

---

# Problem Statement

Enterprise metadata changes continuously.

As organizations grow, metadata quality declines due to:

- Missing dataset owners
- Missing descriptions
- Missing glossary terms
- Incomplete metadata
- Manual governance effort
- Delayed issue detection

Governance teams spend significant time identifying and resolving these issues manually.

Burnish addresses this challenge through intelligent metadata analysis and AI-assisted governance.

---

# Target Users

### Primary Users

- Data Governance Teams
- Metadata Administrators

---

### Secondary Users

- Data Engineers
- Data Analysts
- Platform Administrators
- Business Intelligence Teams

---

# Business Objective

Develop an AI-powered governance assistant that demonstrates how intelligent agents can improve enterprise metadata quality using DataHub.

The MVP should clearly showcase practical AI assistance rather than theoretical automation.

---

# User Objectives

Users should be able to:

- Scan metadata.
- Discover governance issues.
- Understand why issues exist.
- Review AI recommendations.
- Approve metadata updates.
- View governance history.

---

# Product Objectives

The MVP should:

- Reduce manual governance effort.
- Improve metadata completeness.
- Increase trust in metadata.
- Demonstrate explainable AI.
- Showcase safe governance automation.

---

# Success Criteria

The MVP will be considered successful if it can:

- Connect to DataHub.
- Scan metadata successfully.
- Detect governance gaps.
- Generate AI recommendations.
- Explain recommendations.
- Apply approved updates.
- Record audit history.
- Demonstrate the complete workflow during a 3-minute demo.

---

# Constraints

The MVP must:

- Be completed within the hackathon timeline.
- Integrate with DataHub.
- Use DataHub APIs or MCP.
- Remain focused on governance.
- Keep human approval in the workflow.

---

# Assumptions

The project assumes:

- A DataHub instance is available.
- Metadata contains governance issues.
- AI models are available for recommendation generation.
- Users understand basic metadata concepts.

---

# Out of Scope

The MVP will not include:

- Multi-tenant architecture
- Enterprise RBAC
- Kubernetes deployment
- Multi-agent collaboration
- Mobile applications
- Advanced analytics

These features belong to future versions.

---

# Key Success Metrics

- Governance issues detected
- Recommendations generated
- Approval success rate
- Metadata updates completed
- Demo stability
- Judge understanding
- User confidence

---

# Key Takeaways

- Burnish solves a practical governance problem.
- The MVP focuses on one clear workflow.
- Every feature supports the hackathon demonstration.
- Simplicity and reliability take priority over feature quantity.
---
---

# Session 2 – Hackathon Rules Mapping

## Objective

A successful hackathon project is not measured only by technical quality—it must also satisfy the competition requirements.

This session maps every core feature of Burnish directly to the official DataHub Agent Hackathon requirements to ensure that the MVP remains focused, compliant, and demo-ready.

Every feature included in the MVP should strengthen our submission against the judging criteria.

---

# Hackathon Requirement Mapping

| Official Requirement | Burnish MVP Implementation |
|----------------------|----------------------------|
| Use DataHub | Connect to a DataHub instance and retrieve metadata for analysis. |
| Use MCP Server or Agent Context Kit | Integrate with the DataHub MCP Server to access metadata and perform governance operations. |
| AI Agent | Burnish acts as an autonomous AI Governance Engineer that analyzes metadata and generates recommendations. |
| Demonstrate Practical Value | Detect governance issues and assist users in improving metadata quality. |
| Explain AI Decisions | Every recommendation includes a clear explanation of why the issue exists and why the proposed fix is appropriate. |
| Human Approval | Governance changes require user approval before execution. |
| Metadata Updates | Approved recommendations are written back to DataHub using supported APIs. |
| Demo Ready | The complete workflow can be demonstrated in less than three minutes. |

---

# Burnish MVP Workflow

The MVP is designed around a single end-to-end governance workflow.

```
User Opens Burnish

↓

Connect to DataHub

↓

Scan Metadata

↓

Detect Governance Issues

↓

AI Generates Recommendations

↓

Explain Recommendations

↓

User Reviews Suggestions

↓

Approve Changes

↓

Update DataHub

↓

Generate Audit Log

↓

Workflow Complete
```

This workflow represents the complete value proposition of Burnish and forms the foundation of the demonstration shown to judges.

---

# Feature Validation Checklist

Every feature added to the MVP should satisfy the following checklist.

| Question | Requirement |
|----------|-------------|
| Does it improve metadata governance? | Yes |
| Does it use DataHub? | Yes |
| Does it support AI reasoning? | Yes |
| Can it be demonstrated in three minutes? | Yes |
| Does it improve the judging experience? | Yes |
| Is it achievable within the hackathon timeline? | Yes |

If a feature cannot satisfy these questions, it should not be included in the MVP.

---

# MVP Principles

During development, Burnish will follow these principles.

### Build Only What Supports the Demo

Every implemented feature should strengthen the end-to-end demonstration.

---

### Prefer Reliability Over Complexity

A stable and complete workflow is more valuable than many incomplete features.

---

### Human Oversight is Mandatory

Burnish assists governance teams but does not replace their decision-making authority.

---

### Explainability is a Core Feature

Recommendations should always include understandable reasoning.

---

### Deliver a Complete User Journey

The MVP should feel like a usable product rather than a collection of disconnected features.

---

# Risks and Mitigation

| Risk | Mitigation |
|------|------------|
| Too many planned features | Strict MVP prioritization in the next session. |
| Integration challenges | Use the official DataHub MCP Server and APIs. |
| AI recommendations are unclear | Provide concise reasoning for every suggestion. |
| Demo instability | Focus on one reliable workflow and test thoroughly. |
| Time constraints | Build the Must Have features first and postpone others. |

---

# Definition of MVP Success

The Burnish MVP will be considered successful if a judge can:

- Launch the application.
- Connect to DataHub.
- Scan enterprise metadata.
- Observe governance issues.
- Understand AI-generated reasoning.
- Approve recommendations.
- Apply changes to DataHub.
- Review the generated audit history.

The entire experience should be completed smoothly within the three-minute demonstration window.

---

# Key Takeaways

- Every Burnish feature maps directly to a hackathon requirement.
- The MVP focuses on one complete governance workflow.
- Simplicity and reliability take priority over feature quantity.
- Every development decision should strengthen the final demonstration.

---