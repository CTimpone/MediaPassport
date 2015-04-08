MediaPassport.Views.WatchlistItem = Backbone.View.extend({
  template: JST["watchlist/watchlist_item"],

  tagName: "tr",

  className: "watchlist_item",

  events: {
    "click .watchlist-toggle": "showModal"
  },

  render: function () {
    var content = this.template({
      item: this.model
    });
    this.$el.html(content);

    return this;
  },

  showModal: function (event) {
    $('.modal').css("display", "block");
    $('.modal strong').html(this.model.escape('title'));

    $('.modal-confirm').one("click", this.removeItem.bind(this));
  },

  removeItem: function (event) {
    var items;

    var $button = this.$('.watchlist-toggle');

    if (!$button.prop("disabled")) {
      $button.html("Processing");
      $button.prop("disabled", true)
      items = new MediaPassport.Collections.WatchlistItems({
        show_title: encodeURIComponent(this.model.get('title'))
      });
      items.create({}, {
        success: function () {
          this.collection.fetch();
          $('.modal').css("display", "none");
        }.bind(this)
      });
    }
  }
})
