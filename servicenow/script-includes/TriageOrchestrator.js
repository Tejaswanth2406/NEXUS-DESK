var TriageOrchestrator = Class.create();
TriageOrchestrator.prototype = {
  initialize: function () {},
  process: function (incident) {
    var validation = new IncidentValidationService().validate(incident);
    if (!validation.valid) throw new Error('Invalid incident: ' + validation.errors.join(','));
    var classification = new TicketClassifier().classify(incident.description, incident.category);
    var priority = new PriorityEngine().evaluate(incident.impact, incident.urgency);
    var assignmentGroupName = new AssignmentRouter().route(classification);
    return {classification: classification, priority: priority, assignmentGroupName: assignmentGroupName, humanReviewRequired: incident.aiDecision === true};
  },
  type: 'TriageOrchestrator'
};
