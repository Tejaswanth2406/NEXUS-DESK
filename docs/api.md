# Scoped REST API contract

Authentication: OAuth 2.0 with separate employee, agent and manager scopes. Reject anonymous requests.

## POST `/api/x_nexus_desk/incidents`

Request:

```json
{
  "shortDescription": "VPN unavailable",
  "description": "VPN returns authentication timeout",
  "category": "network",
  "impact": "2",
  "urgency": "2"
}
```

Validations:

- `shortDescription`: required, 5-160 characters
- `description`: required, 1-4000 characters
- `category`: supported category
- `impact`/`urgency`: `1`, `2`, or `3`

Response `201`:

```json
{
  "result": {
    "number": "INC0012401",
    "priority": "2",
    "state": "1",
    "assignmentGroup": "Network Operations"
  }
}
```

Errors use HTTP `400` for validation, `401` for authentication, `403` for authorization and `502` for provider integration failure where no deterministic fallback is possible.
