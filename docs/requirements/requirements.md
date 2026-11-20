# Functional and non-functional requirements

## Functional requirements

FR-1: Employees submit incidents with description, category, impact and urgency.
FR-2: NEXUS Desk validates and normalizes all submitted values.
FR-3: Classification assigns a category and priority.
FR-4: Routing selects an assignment group.
FR-5: Knowledge search returns relevant published articles.
FR-6: Resolution suggestions require review when AI-assisted.
FR-7: Agents, managers and administrators receive role-appropriate views.
FR-8: Triage decisions, overrides and reviewers are auditable.
FR-9: Flow Designer notifies users and escalates SLA breaches.

## Non-functional requirements

- Availability: application workflows tolerate provider failures.
- Security: scoped OAuth, ACL enforcement and no secrets in client code.
- Performance: portal submission returns within 3 seconds under normal load.
- Resilience: deterministic fallback remains available after AI failure.
- Compatibility: ES2022-compatible JavaScript and supported ServiceNow APIs.
- Observability: audit trails and integration error records.
