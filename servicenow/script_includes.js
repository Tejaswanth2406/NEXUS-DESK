/*
Deployment note: paste each object below into its matching scoped Script Include.
All code uses ES2022-compatible syntax supported on current ServiceNow runtimes.
*/

var TicketClassifier = Class.create();
TicketClassifier.prototype = {
  initialize: function () {},
  classify: function (text, category) {
    var value = (category || '').toLowerCase() + ' ' + (text || '').toLowerCase();
    if (/vpn|network|wifi|dns|connect/.test(value)) return 'network';
    if (/password|login|account|mfa|locked/.test(value)) return 'identity';
    if (/email|outlook|mail/.test(value)) return 'email';
    if (/laptop|printer|hardware|device|monitor/.test(value)) return 'hardware';
    if (/software|application|app|error/.test(value)) return 'software';
    return 'general';
  },
  type: 'TicketClassifier'
};

var PriorityEngine = Class.create();
PriorityEngine.prototype = {
  initialize: function () {
    this.matrix = {
      '1:1':'1','1:2':'1','1:3':'2','2:1':'1','2:2':'2','2:3':'3','3:1':'2','3:2':'3','3:3':'4'
    };
  },
  evaluate: function (impact, urgency) { return this.matrix[impact + ':' + urgency] || '4'; },
  type: 'PriorityEngine'
};

var AssignmentRouter = Class.create();
AssignmentRouter.prototype = {
  initialize: function () {
    this.routes = {
      network:'Network Operations', identity:'Identity & Access', email:'Messaging Support',
      hardware:'Desktop Support', software:'Application Support', general:'Service Desk'
    };
  },
  route: function (classification) { return this.routes[classification] || this.routes.general; },
  type: 'AssignmentRouter'
};

var TriageOrchestrator = Class.create();
TriageOrchestrator.prototype = {
  initialize: function () {},
  process: function (incident) {
    if (!incident || !incident.description || !incident.category)
      throw new Error('description and category are required');
    var classifier = new TicketClassifier();
    var priority = new PriorityEngine();
    var router = new AssignmentRouter();
    var classification = classifier.classify(incident.description, incident.category);
    return {
      classification: classification,
      priority: priority.evaluate(incident.impact, incident.urgency),
      assignmentGroupName: router.route(classification),
      humanReviewRequired: incident.aiDecision === true
    };
  },
  type: 'TriageOrchestrator'
};
