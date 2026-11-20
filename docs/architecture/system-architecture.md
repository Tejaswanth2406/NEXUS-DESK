# System architecture

The React portal calls a secured scoped REST integration, which validates payloads before any `incident` table operation. `TriageOrchestrator` invokes classification, priority, routing and resolution services. Provider selection uses a factory with AI and deterministic implementations. Business Rules enforce final consistency, while events and Flow Designer process notifications and escalation.
