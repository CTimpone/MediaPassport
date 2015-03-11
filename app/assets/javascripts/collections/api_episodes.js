MediaPassport.Collections.ApiEpisodes = Backbone.Collection.extend({
  model: MediaPassport.Models.ApiEpisode,

  url: function () {
    return "http://api.tvmaze.com/shows/" + this.maze_id + "/episodes";
  },

  initialize: function (options) {
    this.maze_id = options.maze_id;
  }
})
