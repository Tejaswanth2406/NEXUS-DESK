// Run this logic in a Before Insert/Update Business Rule on incident.
(function executeRule(current, previous) {
  if (!gs.nil(current.short_description) && current.short_description.toString().trim().length < 5)
    current.setAbortAction(true), gs.addErrorMessage('Short description must be at least 5 characters');

  if (!gs.nil(current.description) && current.description.toString().length > 4000)
    current.setAbortAction(true), gs.addErrorMessage('Description exceeds 4000 characters');

  if (current.operation() !== 'insert' && gs.nil(current.caller_id))
    current.setAbortAction(true), gs.addErrorMessage('Caller is required');

  if (current.operation() === 'insert') {
    var orchestrator = new TriageOrchestrator();
    var result = orchestrator.process({
      description: current.description,
      category: current.category,
      impact: current.impact,
      urgency: current.urgency
    });
    current.priority = result.priority;
  }
})(current, previous);
