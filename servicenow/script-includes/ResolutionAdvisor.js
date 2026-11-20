var ResolutionAdvisor = Class.create();
ResolutionAdvisor.prototype = {
  initialize: function () {},
  advise: function (incident, aiProviderAvailable) {
    var classification = new TicketClassifier().classify(incident.description, incident.category);
    var suggestions = {
      network:['Check adapter and VPN configuration','Review recent network changes'],
      identity:['Confirm account and MFA status','Use the approved password reset'],
      email:['Verify mailbox connectivity','Clear cached credentials'],
      hardware:['Check power and connections','Verify asset warranty'],
      software:['Capture exact error','Check approved application logs'],
      general:['Collect reproduction details','Follow the standard Service Desk checklist']
    };
    return {provider: aiProviderAvailable ? 'ai-pending-validation' : 'deterministic', suggestions:suggestions[classification], reviewRequired: aiProviderAvailable};
  },
  type: 'ResolutionAdvisor'
};
