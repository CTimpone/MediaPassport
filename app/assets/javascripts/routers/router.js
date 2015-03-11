MediaPassport.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "search",
    "shows/:title": "showEpisode"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this._shows = new MediaPassport.Collections.Shows();
    this._shows.fetch();
  },

  search: function () {
    var view = new MediaPassport.Views.SearchResults({shows: this._shows});
    this.$rootEl.html(view.render().$el)
  },

  showEpisode: function (title) {
    title = title.replace(/_/g, ' ')
    var show = this._shows.where({title: title});

    if (!show) {
      this.listenToOnce(this._shows, "sync", this.showEpisode.bind(this, title))
    } else {
      var view = new MediaPassport.Views.EpisodeShow({model: show});
      this.$rootEl.html(view.render().$el);
    }
  }
})
