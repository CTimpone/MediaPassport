MediaPassport.Collections.WatchlistItems = Backbone.Collection.extend({
  url: function () {
    return "/shows/" + this.show_title + "/watchlist_toggle";
  },

  initialize: function (options) {
    this.show_title = options.show_title;
  }
});
