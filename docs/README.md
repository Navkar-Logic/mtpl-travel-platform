# MTPL Travel Platform — Engineering Documentation

## Purpose

This directory is the engineering source of truth for the MTPL travel platform.

The documentation is written so that a developer or AI coding agent can understand the product, architecture, design system, implementation rules, scope boundaries, QA requirements, and deployment model before modifying the codebase.

## Document Map

1. `PROJECT_CONTEXT.md` — client, domains, product context, business facts, and constraints.
2. `PRODUCT_REQUIREMENTS.md` — Phase 1 functional requirements and Phase 2 direction.
3. `PAGE_SPECIFICATION.md` — page-by-page website requirements and route structure.
4. `DESIGN_SYSTEM.md` — MTPL visual language, color, typography, spacing, UI rules, responsive behavior.
5. `COMPONENT_SPECIFICATION.md` — reusable component inventory and behavior.
6. `CONTENT_AND_DATA_MODEL.md` — content strategy and data-driven rendering rules.
7. `DATABASE_ARCHITECTURE.md` — MongoDB/Mongoose architecture and collection responsibilities.
8. `ENQUIRY_SYSTEM.md` — contact and travel enquiry flow.
9. `SEO.md` — technical and on-page SEO requirements.
10. `ACCESSIBILITY.md` — accessibility requirements.
11. `SECURITY.md` — application and infrastructure security requirements.
12. `TESTING_QA.md` — testing strategy, acceptance criteria, and release gates.
13. `DEVELOPMENT_WORKFLOW.md` — Git, environments, implementation workflow, and definition of done.
14. `DEPLOYMENT.md` — development, staging, production, VPS, Docker, Nginx, SSL, and backup model.
15. `PHASE_2_ARCHITECTURE.md` — future TBO, CCAvenue, booking, ticket, and admin architecture.
16. `CLIENT_CONTENT_REQUIREMENTS.md` — information/assets that must be supplied or approved by MTPL.
17. `AI_DEVELOPMENT_GUIDE.md` — mandatory instructions for AI coding agents.
18. `CHANGELOG.md` — documentation/project decisions log.

## Source-of-Truth Rule

When implementing the project:

- Requirements and scope come from `PRODUCT_REQUIREMENTS.md`.
- Visual decisions come from `DESIGN_SYSTEM.md`.
- Routes and page behavior come from `PAGE_SPECIFICATION.md`.
- Data ownership comes from `CONTENT_AND_DATA_MODEL.md` and `DATABASE_ARCHITECTURE.md`.
- Engineering rules come from `DEVELOPMENT_WORKFLOW.md` and `AI_DEVELOPMENT_GUIDE.md`.
- Phase 2 must not leak into Phase 1 unless explicitly approved.

If a requirement is not defined, do not invent client claims, prices, awards, testimonials, statistics, package inclusions, or legal content. Mark the item as `TBD` and request/record the required source.

## Current Product Direction

Phase 1 is a premium, dynamic, enquiry-driven MTPL travel website.

Phase 2 is a real travel booking platform with flight/hotel APIs, payment gateway, booking management, ticket/voucher handling, and an admin platform.

The Phase 1 architecture must be reusable for Phase 2 without a full rewrite.
