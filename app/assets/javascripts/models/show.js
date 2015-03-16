MediaPassport.Models.Show = Backbone.Model.extend({
  url: function () {
    if (this.isNew()) {
      return "/shows";
    } else {
      console.log(this);
      return "/shows/" + escape(this.get('title').replace(/ /g, '_'));
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
