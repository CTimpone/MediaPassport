MediaPassport.Views.SearchResultItem = Backbone.View.extend({
  tagName: "li",

  template: JST['search_result_item'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    if (this.model) {
      var content = this.template({show: this.model});
      this.$el.html(content);
    }

    return this;
  }
})
