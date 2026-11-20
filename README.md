# NEXUS Desk

NEXUS Desk is a ServiceNow-native ITSM sample application with a React/Vite employee portal. It uses the standard `incident` table as the primary incident source and adds scoped application roles, triage logic, audit hooks and secured API contracts.

## Workspace contents

- `src/` — React portal and reusable deterministic triage modules
- `servicenow/` — deployment notes and scoped Script Include/Business Rule source
- `tests/` — additional ATF and integration test specifications
- `docs/` — architecture, API contract and PDI deployment guide

## Local portal

Requirements: Node.js 20+.

```powershell
npm install
npm run dev
npm test
npm run build
```

The portal starts with an in-memory ServiceNow-compatible demo dataset. Set `VITE_NEXUS_API_BASE` to a scoped REST endpoint to use the PDI.

## PDI deployment

1. Create a scoped app named **NEXUS Desk** with scope `x_nexus_desk`.
2. Create the roles and ACLs defined in `servicenow/roles_acl.md`.
3. Create the Script Includes in `servicenow/script_includes.js`.
4. Add the Before Insert/Update incident Business Rule from `servicenow/business_rules.js`.
5. Configure the REST, Knowledge, Flow Designer and SLA resources described in `docs/deployment.md`.
6. Deploy the React build behind HTTPS in App Engine Studio, Static Content or an approved external portal host.

## Security and human review

No AI decision is applied automatically. AI outputs must pass schema and constraint validation; failures use deterministic fallback. Assignment, priority and sensitive resolution changes require an authorized review step.
