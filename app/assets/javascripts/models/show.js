MediaPassport.Models.Show = Backbone.Model.extend({
  // urlRoot: "/shows/",
  url: function () {
    if (this.isNew()) {
      return "/shows";
    } else {
      return "/shows/" + this.escape('title').replace(/ /g, '_');
    }
  },

  episodes: function () {
    if (!this._episodes) {
      this._episodes = new MediaPassport.Collections.Episodes([], {show_title: this.escape('title')});
    }

    return this._episodes;
  },

  parse: function (response) {
    if (response.episodes) {
      this.episodes().set(response.episodes)
      delete response.episodes;
    }

    return response;
  },
})
