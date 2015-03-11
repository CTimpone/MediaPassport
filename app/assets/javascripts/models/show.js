MediaPassport.Models.Show = Backbone.Model.extend({
  url: function () {
    return "/shows/" + this.escape('title').replace(/ /g, '_')
  },

  episodes: function () {
    if (!this._episodes) {
      this._episodes = new MediaPassport.Collections.Episodes([], {show_id: this.id});
    }

    return this._episodes;
  },

  parse: function (response) {
    debugger
    if (response.episodes) {
      this.episodes().set(response.episodes)
      delete response.episodes;
    }

    return response;
  }
})