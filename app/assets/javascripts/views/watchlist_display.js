MediaPassport.Views.WatchlistDisplay = Backbone.CompositeView.extend({
  template: JST["watchlist_display"],

  initialize: function () {
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

    if (this.collection.where({rec: false}).length === 0) {
      $('.watchlist-items').addClass('invis');
    }

    if (this.collection.where({rec: true}).length === 0) {
      $('.recommendations').addClass('invis');
    }

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
