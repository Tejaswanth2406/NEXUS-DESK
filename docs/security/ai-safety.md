# AI safety

AI output is advisory. Required controls:

- Redact credentials and secrets before provider transmission.
- Validate JSON against a strict schema.
- Reject unsupported categories, priority values and assignment groups.
- Escape text before presentation and never execute provider text.
- Fall back deterministically on timeout, error or invalid output.
- Require human review for priority, assignment or resolution changes.
- Audit provider, output status, fallback and reviewer.
