# NEXUS Desk roles and ACLs

| Role | Scope |
|---|---|
| `x_nexus_desk.employee` | Submit and view owned incidents |
| `x_nexus_desk.agent` | Process queue, add work notes and resolutions |
| `x_nexus_desk.manager` | Read dashboards, workload and SLA metrics |
| `x_nexus_desk.admin` | Configure rules, integrations and provider credentials |

## ACL requirements

- Incident: deny create for anonymous users; employee create is allowed, read is restricted to `caller_id` or agent/manager/admin.
- Incident write: agents and admins may update assignments; employees may not change impact, urgency or priority.
- Knowledge: employee read from published articles only.
- Audit table: create/read by application services and managers/admins; no employee write or delete.
- REST API: require OAuth 2.0 or an authenticated external integration role; never expose credentials in the portal.
