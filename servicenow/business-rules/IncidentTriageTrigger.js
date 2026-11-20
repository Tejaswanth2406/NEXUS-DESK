(function executeRule(current) {
  if (current.operation() !== 'insert') return;
  var result = new TriageOrchestrator().process({
    shortDescription: current.short_description.toString(),
    description: current.description.toString(),
    category: current.category.toString(),
    impact: current.impact.toString(),
    urgency: current.urgency.toString()
  });
  current.priority = result.priority;
})(current);
