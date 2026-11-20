export const environment = Object.freeze({
  port: process.env.PORT || 3001,
  instanceUrl: process.env.SERVICENOW_INSTANCE_URL || '',
  apiBase: process.env.SERVICENOW_API_BASE || '/api/x_nexus_desk',
  oauthIssuer: process.env.OAUTH_ISSUER || '',
})
