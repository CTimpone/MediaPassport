MediaPassport.Collections.Search = Backbone.Collection.extend({
  url: function () {
    return "/search?query=" + this.query
  },

  initialize: function (options) {
    this.query = options.query;
  }
})
