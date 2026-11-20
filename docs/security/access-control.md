# Access control

Roles:

- `x_nexus_desk.employee`: create incidents and read own records.
- `x_nexus_desk.agent`: read assigned queues, update work notes and resolution.
- `x_nexus_desk.manager`: read dashboards and SLA/workload metrics.
- `x_nexus_desk.admin`: manage configuration and integrations.

ACLs must enforce authorization independently of UI visibility. The REST API must validate both scopes and caller identity.
