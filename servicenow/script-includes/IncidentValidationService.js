var IncidentValidationService = Class.create();
IncidentValidationService.prototype = {
  initialize: function () {},
  validate: function (incident) {
    var errors = [];
    if (!incident.shortDescription || incident.shortDescription.length < 5) errors.push('shortDescription');
    if (!incident.description) errors.push('description');
    if (!/^(network|identity|email|hardware|software|general)$/.test(incident.category || '')) errors.push('category');
    if (!/^[123]$/.test(incident.impact || '')) errors.push('impact');
    if (!/^[123]$/.test(incident.urgency || '')) errors.push('urgency');
    return {valid: errors.length === 0, errors: errors};
  },
  type: 'IncidentValidationService'
};
