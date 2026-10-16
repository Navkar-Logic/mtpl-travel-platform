# MTPL Travel Platform — Development Workflow

## Branches

```text
main
develop
feature/*
fix/*
```

`main` is production.

`develop` is the active development branch.

Feature/fix branches are used for isolated work when appropriate.

## Implementation Cycle

```text
Requirement
 ↓
Design/architecture
 ↓
Data/API contract
 ↓
Implementation
 ↓
Local QA
 ↓
Lint/typecheck/build
 ↓
Commit
 ↓
Pull Request/review
 ↓
Staging
 ↓
UAT
 ↓
Production
```

## Commit Rules

Use clear commits.

Examples:

```text
feat: add holiday package cards
feat: add travel enquiry persistence
fix: correct mobile navigation overflow
refactor: extract package service
docs: update deployment guide
```

Avoid commits such as:

```text
changes
update
final
done
test
```

## AI Coding Rules

Before changing architecture:

1. Read relevant documentation.
2. Inspect existing implementation.
3. Preserve working behavior.
4. Make the smallest coherent change.
5. Run relevant checks.
6. Report what changed.

## Do Not

- rewrite unrelated files
- replace working architecture without reason
- introduce a new library for a trivial task
- hardcode client-managed content
- bypass validation
- put secrets in source
- edit production directly
- create duplicate components unnecessarily

## Environments

Development → Staging/UAT → Production.

Never use production as a development database.

## Pull Requests

PRs should explain:

- what changed
- why
- testing performed
- screenshots for significant UI changes
- known limitations

## Definition of Done

A feature is done only when:

- implementation complete
- responsive
- accessible
- validated
- error/loading/empty states handled
- database/API behavior verified where applicable
- lint/build passes
- documentation updated if architecture changed
- no known critical defects
- Git history is clean enough for review

## Client Changes

Separate:

- bug
- content correction
- minor visual correction
- approved scope change
- new feature

Do not silently turn new scope into development work without recording the change.
