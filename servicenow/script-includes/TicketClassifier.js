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
