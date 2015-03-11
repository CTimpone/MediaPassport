MediaPassport.Collections.ApiShows = Backbone.Collection.extend({
  model: MediaPassport.Models.ApiShow,

  url: function () {
    return "http://api.tvmaze.com/search/shows?q=" + this.title_convert();
  },

  title_convert: function () {
    return this.title.toLowerCase().replace(/ /g, '+');
  },

  initialize: function (options) {
    this.title = options.title;
  }
})
