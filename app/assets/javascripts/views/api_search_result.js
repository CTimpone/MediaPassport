MediaPassport.Views.ApiSearchResult = Backbone.View.extend({
  tagName: "li",

  template: JST['api_search_result'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({
      show: this.model
    });
    this.$el.html(content);

    return this;
  }
})
