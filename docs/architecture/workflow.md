# Incident lifecycle workflow

1. Employee submits a validated incident.
2. Business Rule invokes TriageOrchestrator.
3. Classification, priority and routing values are calculated.
4. Knowledge search and resolution advisor produce suggestions.
5. AI output is schema-validated or replaced by deterministic fallback.
6. Sensitive decisions wait for human review.
7. Flow Designer sends notifications and tracks approvals/escalations.
8. SLA engine records approach and breach events.
9. Agent resolves the incident and records resolution details.
