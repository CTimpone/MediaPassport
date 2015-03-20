MediaPassport.Collections.ApiShows = Backbone.Collection.extend({
  model: MediaPassport.Models.ApiShow,

  url: function () {
    return "//api.tvmaze.com/search/shows?q=" + this.titleConvert();;
  },

  initialize: function (options) {
    this.title = options.title;
  },

  titleConvert: function () {
    return this.title.replace(/_/g, '+')
  }
})
