MediaPassport.Views.WatchlistItem = Backbone.View.extend({
  template: JST["watchlist_item"],

  tagName: "li",

  className: "watchlist_item",

  events: {
    "click .watchlist-toggle": "removeItem"
  },

  render: function () {
    var content = this.template({
      item: this.model
    });
    this.$el.html(content);

    return this;
  },

  removeItem: function (event) {
    var items;
    var $button = $(event.currentTarget);
    if (!$button.prop("disabled")) {
      if (window.confirm("Are you sure you want to remove " +
                          this.model.escape('title') + " from your watchlist?")) {
        $button.html("Processing");
        $button.prop("disabled", true)
        items = new MediaPassport.Collections.WatchlistItems({
          show_title: encodeURIComponent(this.model.get('title'))
        });
        items.create({}, {
          success: function () {
            this.remove();
          }.bind(this)
        });
      }
    }
  }
})
