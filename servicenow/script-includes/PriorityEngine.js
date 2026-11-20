var PriorityEngine = Class.create();
PriorityEngine.prototype = {
  initialize: function () {
    this.matrix = {'1:1':'1','1:2':'1','1:3':'2','2:1':'1','2:2':'2','2:3':'3','3:1':'2','3:2':'3','3:3':'4'};
  },
  evaluate: function (impact, urgency) { return this.matrix[impact + ':' + urgency] || '4'; },
  type: 'PriorityEngine'
};
