MediaPassport.Collections.ApiEpisodes = Backbone.Collection.extend({
  model: MediaPassport.Models.ApiEpisode,

  url: function () {
    return "//api.tvmaze.com/shows/" + this.maze_id + "/episodes";
  },

  initialize: function (options) {
    this.maze_id = options.maze_id;
  },

  mostRecentlyAired: function (holder) {
    var dates = this.pluck("airdate");
    var times = dates.map(function (date) {return date - Date.now()});

    var mostRecent = -Infinity;
    var count = 1;

    _.each(times, function (time) {

      if (time <= 0 && time >= mostRecent) {
        mostRecent = time;
      }

      if (count === times.length) {
        index = times.indexOf(mostRecent);
        if (index !== -1) {
          holder.set(_.clone(this.at(index).attributes));
        }

      }

      count+=1
    }.bind(this));
  }
})
