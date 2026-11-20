var AssignmentRouter = Class.create();
AssignmentRouter.prototype = {
  initialize: function () {
    this.routes = {network:'Network Operations',identity:'Identity & Access',email:'Messaging Support',hardware:'Desktop Support',software:'Application Support',general:'Service Desk'};
  },
  route: function (classification) { return this.routes[classification] || this.routes.general; },
  type: 'AssignmentRouter'
};
