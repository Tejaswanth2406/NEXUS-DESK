var KnowledgeSearchService = Class.create();
KnowledgeSearchService.prototype = {
  initialize: function () {},
  search: function (query) {
    var articles = [];
    var gr = new GlideRecord('kb_knowledge');
    gr.addQuery('workflow_state', 'published');
    gr.addQuery('short_description', 'CONTAINS', query);
    gr.setLimit(5);
    gr.query();
    while (gr.next()) articles.push({sysId: gr.getUniqueValue(), number: gr.number.toString(), title: gr.short_description.toString()});
    return articles;
  },
  type: 'KnowledgeSearchService'
};
