MediaPassport.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "search",
    "shows/:title": "showEpisode"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this._shows = new MediaPassport.Collections.Shows();
    this._shows.fetch({ parse: false });
  },

  search: function () {
    var view = new MediaPassport.Views.SearchResults({shows: this._shows});
    this._swapView(view);
  },

  showEpisode: function (title) {
    title = title.replace(/_/g, ' ')
    var show = this._shows.where({title: title})[0];

    if (!show) {
      this._shows.fetch();
      this.listenToOnce(this._shows, "sync", this.showEpisode.bind(this, title));
    } else {
      show.fetch();
      var view = new MediaPassport.Views.EpisodeShow({model: show});
      this._swapView(view);
    }
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
