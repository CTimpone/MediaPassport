MediaPassport.Views.WatchlistDisplay = Backbone.CompositeView.extend({
  template: JST["watchlist_display"],

  initialize: function () {
    console.log(this.collection);
    this.listenTo(this.collection, "sync", this.renderItems)
    this.listenTo
  },

  render: function () {
    this.removeSubviews();
    var content = this.template();
    this.$el.html(content);

    this.renderItems();
    return this;
  },

  renderItems: function (event) {
    this.subviews && this.removeSubviews();

    this.collection.each(function (item) {
      if (item.escape('rec') === "false") {
        var subview = new MediaPassport.Views.WatchlistItem({
          model: item
        });
        this.addSubview('.watchlist-items', subview);
      } else {
        var subview = new MediaPassport.Views.RecommendationItem({
          model: item,
          collection: this.collection
        });
        this.addSubview('.recommendations', subview);
      }
    }.bind(this));
  }
});
