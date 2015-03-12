MediaPassport.Routers.Router = Backbone.Router.extend({
  routes: {
    "search": "search",
    "sign_in": "newSession",
    "sign_up": "newUser",

    "shows/:title": "showLanding"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$headerEl = options.$headerEl;
    this._shows = new MediaPassport.Collections.Shows();
    this._shows.fetch({ parse: false });
    this.headerFill();
  },

  headerFill: function () {
    this.navView = new MediaPassport.Views.NavView();
    this.$headerEl.html(this.navView.render().$el);
  },

  newUser: function () {
    var view = new MediaPassport.Views.NewUser();
    this._swapView(view);
  },

  newSession: function () {
    var view = new MediaPassport.Views.NewSession();
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

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})
