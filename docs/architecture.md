# Architecture

NEXUS Desk follows a layered architecture:

1. React portal: reusable form, status, dashboard and API-adapter components.
2. Secured scoped REST API: validation and authorization boundary.
3. `TriageOrchestrator`: coordinates classification, priority, routing and review state.
4. Strategy modules: configurable priority and routing evaluation.
5. Resolution provider factory: AI provider with deterministic fallback.
6. ServiceNow platform: standard incident table, Knowledge, Business Rules, Flow Designer and SLA engine.

## Core behavior

- `TicketClassifier` categorizes incidents from category and description.
- `PriorityEngine` evaluates a 3 x 3 impact/urgency matrix.
- `AssignmentRouter` returns a support team for a classification.
- `ResolutionAdvisor` is backed by either a validated AI provider or deterministic suggestions.
- `TriageAuditService` records recommendation, decision, override and reviewer.
- Lifecycle events trigger audit and escalation processing rather than direct UI coupling.

## Data model

Primary record: standard `incident`.

Recommended scoped tables:

- `x_nexus_desk_triage_audit`: incident, recommendation, decision, override reason, reviewer and timestamps.
- `x_nexus_desk_provider_config`: provider name, endpoint alias, enabled state and version.
- `x_nexus_desk_escalation_event`: incident, event type, owner and processing status.
