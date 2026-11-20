# PDI deployment and demonstration

## Prerequisites

- ServiceNow Personal Developer Instance
- Scoped app Source Control repository
- OAuth application registration for the portal
- REST message credential alias for the optional AI provider

## Deployment

1. Clone or import the repository in ServiceNow Studio source control.
2. Create the `x_nexus_desk` scope and named roles.
3. Import/create Script Includes:
   - `TicketClassifier`
   - `PriorityEngine`
   - `AssignmentRouter`
   - `KnowledgeSearchService`
   - `ResolutionAdvisor`
   - `TriageAuditService`
   - `TriageOrchestrator`
4. Create the incident Business Rules and scoped ACLs.
5. Configure notification, approval and escalation flows.
6. Define Priority 1-4 SLA tasks and breach/approach thresholds.
7. Publish the portal build and configure CORS and OAuth callback URL.
8. Run ATF and integration tests before requesting deployment.

## Flow Designer

- **Incident triage:** on insert, run triage, write audit record and evaluate review requirement.
- **Resolution review:** for AI output, pause and notify an authorized reviewer.
- **Approaching SLA:** generate notification and assign escalation owner.
- **Breached SLA:** set escalation state and notify incident manager.

## Reproducible demo

1. Submit `VPN unavailable` with impact/urgency `2/2`; verify classification `network`, priority `2` and Network Operations assignment.
2. Submit account lockout with `1/1`; verify identity classification and human review.
3. Open the agent dashboard and resolve the incident.
4. Run approaching-SLA and breach conditions with test timestamps.
5. Confirm audit record contains provider, recommendation, decision and reviewer.
6. Force AI invalid JSON; verify deterministic fallback and audit result.
