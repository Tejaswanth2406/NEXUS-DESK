# Threat model

Assets: incident content, caller identity, assignment data, credentials and AI provider output.

Threats:

- Unauthorized incident discovery or cross-user access.
- Injection through description/category fields.
- Token leakage or overly broad OAuth scopes.
- AI prompt injection or unsafe recommendation content.
- Provider outage or malformed provider responses.
- Privilege escalation through client-side role state.

Controls: server-side ACLs, allowlisted inputs, encoded HTML, scoped OAuth, credential aliases, schema validation, deterministic fallback and human review.
