MediaPassport.Collections.Search = Backbone.Collection.extend({
  url: function () {
    return "/search?query=" + this.query + "&page=" + this.page;
  },

  initialize: function (options) {
    this.query = options.query;
    this.page = options.page
  }
})
