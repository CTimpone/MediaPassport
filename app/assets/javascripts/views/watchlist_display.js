MediaPassport.Views.WatchlistDisplay = Backbone.CompositeView.extend({
  template: JST["watchlist_display"],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.renderItems)
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    this.renderItems();
    return this;
  },

  renderItems: function (event) {
    this.subviews && this.removeSubviews();

    this.collection.each(function (item) {
      var subview = new MediaPassport.Views.WatchlistItem({
        model: item
      });

      this.addSubview('.watchlist-items', subview);
    }.bind(this));
  }
});
