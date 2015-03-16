MediaPassport.Views.WatchlistItem = Backbone.View.extend({
  template: JST["watchlist_item"],

  tagName: "li",

  className: "watchlist_item",

  render: function () {
    var content = this.template({
      item: this.model
    });
    this.$el.html(content);

    return this;
  }
})
