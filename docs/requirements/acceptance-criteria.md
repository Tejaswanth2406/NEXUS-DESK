# Acceptance criteria

- Invalid fields are rejected before database writes.
- Impact/urgency `1/1` produces priority `1`.
- Classification text is deterministic for network, identity, email, hardware and software.
- AI output failure triggers deterministic fallback.
- Sensitive AI decisions remain unapproved until human review.
- Employee ACL access cannot read another employee's incident.
- Agent ACL access can update assignment and work notes.
- Audit records include recommendation, decision, override reason and reviewer.
- ATF proves insert, update, ACL, notification and escalation behavior.
