MediaPassport.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "primaryLanding",
    "search": "search",
    "sign_in": "newSession",
    "sign_up": "newUser",
    "shows/:title": "showLanding",
    "shows/:show_title/episodes/:title": "episodeLanding"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$headerEl = options.$headerEl;
    this._shows = new MediaPassport.Collections.Shows();
    this._shows.fetch({ parse: false });
    this.session = new MediaPassport.Models.Session();
    this.session.fetch({
      success: function () {
        this.headerFill();
      }.bind(this)
    });
  },

  headerFill: function () {
    this.navView && this.navView.remove();
    this.navView = new MediaPassport.Views.NavView({model: this.session});
    this.$headerEl.html(this.navView.render().$el);
  },

  primaryLanding: function () {
    var view = new MediaPassport.Views.Landing()
    this._swapView(view);
  },

  newUser: function () {
    var view = new MediaPassport.Views.NewUser({model: this.session});
    this._swapView(view);
  },

  newSession: function () {
    var view = new MediaPassport.Views.NewSession({model: this.session});
    this._swapView(view);
  },

  search: function () {
    var view = new MediaPassport.Views.SearchResults({
      shows: this._shows
    });
    this._swapView(view);
  },

  showLanding: function (title) {
    title = title.replace(/_/g, ' ')
    var show = this._shows.where({title: title})[0];

    if (!show) {
      this._shows.fetch();
      this.listenToOnce(this._shows, "sync", this.showLanding.bind(this, title));
    } else {
      show.fetch({success: function () {
        var view = new MediaPassport.Views.ShowLanding({model: show});
        this._swapView(view);
      }.bind(this)});
    }
  },

  episodeLanding: function (show_title, title) {
    show_title = show_title.replace(/_/g, ' ')
    title = title.replace(/_/g, ' ')

    var show = this._shows.where({title: show_title})[0];
    var episode = show.episodes().where({title: title})[0];
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
