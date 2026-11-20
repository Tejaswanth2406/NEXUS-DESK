var TriageAuditService = Class.create();
TriageAuditService.prototype = {
  initialize: function () {},
  record: function (incidentSysId, provider, recommendation, decision, overrideReason, reviewer) {
    var audit = new GlideRecord('x_nexus_desk_triage_audit');
    audit.initialize();
    audit.incident = incidentSysId;
    audit.provider = provider;
    audit.recommendation = JSON.stringify(recommendation);
    audit.decision = decision;
    audit.override_reason = overrideReason || '';
    audit.reviewer = reviewer || '';
    audit.insert();
  },
  type: 'TriageAuditService'
};
