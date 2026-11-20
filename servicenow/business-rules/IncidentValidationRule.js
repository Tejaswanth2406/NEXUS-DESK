(function executeRule(current) {
  var result = new IncidentValidationService().validate({
    shortDescription: current.short_description.toString(),
    description: current.description.toString(),
    category: current.category.toString(),
    impact: current.impact.toString(),
    urgency: current.urgency.toString()
  });
  if (!result.valid) {
    current.setAbortAction(true);
    gs.addErrorMessage('Incident validation failed: ' + result.errors.join(', '));
  }
})(current);
