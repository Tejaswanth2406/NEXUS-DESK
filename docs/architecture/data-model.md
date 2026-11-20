# Data model

Primary table: `incident`.

Relevant standard fields include `number`, `caller_id`, `short_description`, `description`, `category`, `impact`, `urgency`, `priority`, `state`, `assignment_group`, `opened_at`, `resolved_at`, `closed_at` and SLA tasks.

Scoped tables:

- `x_nexus_desk_triage_audit`
- `x_nexus_desk_provider_config`
- `x_nexus_desk_escalation_event`
