MediaPassport.Views.WatchlistDisplay = Backbone.CompositeView.extend({
  template: JST["watchlist_display"],

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});
