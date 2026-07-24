# Technical Design Document (TDD)

---

# Project Information

**Project Name:** Burnish

**Document Version:** 1.0

**Status:** Draft

**Phase:** Phase 1 – MVP Planning

**Session:** Session 4 – MVP Technical Architecture

**Author:** Arun J

---

# Purpose

This document defines the technical architecture for the Burnish MVP.

Its purpose is to provide a clear engineering blueprint before development begins, ensuring every component has a well-defined responsibility and integrates smoothly with the overall system.

---

# High-Level Architecture

Burnish consists of five primary layers.

```
Frontend Dashboard

↓

FastAPI Backend

↓

AI Governance Engine

↓

DataHub MCP / DataHub APIs

↓

DataHub Metadata Platform
```

Each layer has a dedicated responsibility and communicates only through clearly defined interfaces.

---

# System Components

## 1. Frontend Dashboard

Responsibilities:

- Display datasets
- Show governance issues
- Display AI recommendations
- Show reasoning
- Allow approvals
- Display audit history

Technologies:

- React
- TypeScript
- Tailwind CSS

---

## 2. FastAPI Backend

Responsibilities:

- Receive frontend requests
- Communicate with DataHub
- Trigger metadata scans
- Execute AI analysis
- Apply approved changes
- Store audit history

Technologies:

- Python
- FastAPI

---

## 3. AI Governance Engine

Responsibilities:

- Analyze metadata
- Detect governance gaps
- Generate recommendations
- Explain reasoning
- Estimate confidence

Inputs:

- Dataset metadata

Outputs:

- Governance recommendations

---

## 4. DataHub Integration Layer

Responsibilities:

- Read metadata
- Update metadata
- Retrieve ownership
- Retrieve glossary terms
- Retrieve dataset information

Integration:

- DataHub MCP Server
- DataHub APIs

---

## 5. Audit Module

Responsibilities:

- Record scans
- Record recommendations
- Record approvals
- Record updates
- Record timestamps

Purpose:

Provide complete governance transparency.

---

# User Workflow

```
User

↓

Dashboard

↓

FastAPI

↓

Metadata Scanner

↓

AI Analysis

↓

Recommendations

↓

Approval

↓

DataHub Update

↓

Audit Log

↓

Dashboard Updated
```

---

# Backend Modules

The backend will be organized into independent modules.

```
backend/

app/

api/

services/

scanner/

ai/

datahub/

audit/

models/

schemas/

utils/
```

Each module has a single responsibility.

---

# Frontend Modules

```
frontend/

src/

pages/

components/

services/

hooks/

types/

assets/
```

The frontend remains lightweight and focuses only on presentation.

---

# API Endpoints

The MVP requires the following endpoints.

## Scan Metadata

```
POST /scan
```

Starts a metadata scan.

---

## Get Issues

```
GET /issues
```

Returns detected governance issues.

---

## Generate Recommendations

```
POST /recommendations
```

Generates AI recommendations.

---

## Approve Recommendation

```
POST /approve
```

Approves a governance recommendation.

---

## Audit History

```
GET /audit
```

Returns governance history.

---

# Data Flow

```
Frontend

↓

FastAPI

↓

Scanner

↓

DataHub

↓

Metadata

↓

AI Engine

↓

Recommendations

↓

Approval

↓

DataHub Update

↓

Audit Log

↓

Frontend
```

---

# Security Principles

The MVP follows several security principles.

- Human approval before updates
- No automatic destructive actions
- Explainable AI outputs
- Audit every governance action
- Secure communication with DataHub

---

# Design Principles

The Burnish architecture is based on the following principles.

### Modular

Each component has a single responsibility.

---

### Explainable

Every recommendation includes reasoning.

---

### Maintainable

Modules should be independently testable.

---

### Scalable

Future features should integrate without major architectural changes.

---

### Secure

Users remain in control of governance decisions.

---

# Technical Success Criteria

The architecture will be considered successful if it allows:

- Reliable DataHub integration
- Stable AI recommendations
- Clear API communication
- Easy frontend integration
- Smooth deployment
- Future scalability

---

# Key Takeaways

- Burnish follows a modular architecture.
- Every component has a clearly defined responsibility.
- DataHub remains the source of truth.
- AI enhances governance rather than replacing it.
- The architecture is intentionally lightweight for the MVP.

---