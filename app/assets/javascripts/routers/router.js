MediaPassport.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "primaryLanding",
    "search": "search",
    "sign_in": "newSession",
    "sign_up": "newUser",
    "shows/:title": "showLanding",
    "shows/:show_title/episodes/:title": "episodeLanding",
    "posts/:id": "postDisplay",
    "watchlist": "watchlist"
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
    var initial = this.session.isNew();
    var view = new MediaPassport.Views.Landing({
      shows: this._shows,
      session: this.session,
      initial: initial
    })
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
    title = decodeURI(title.replace(/_/g, ' '));
    var show = this._shows.where({title: title})[0];

    if (!show) {
      this._shows.fetch();
      this.listenToOnce(this._shows, "sync", this.showLanding.bind(this, title));
    } else {
      show.fetch({success: function () {
        var view = new MediaPassport.Views.ShowLanding({
          model: show,
          session: this.session
        });
        this._swapView(view);
      }.bind(this)});
    }
  },

  episodeLanding: function (show_title, title) {
    show_title = show_title;
    title = title;

    var episode = new MediaPassport.Models.Episode({
      fTitle: title,
      fShowTitle: show_title
    })

    episode.fetch({
      success: function () {
        var view = new MediaPassport.Views.EpisodeLanding({
          model: episode,
          session: this.session
        });
        this._swapView(view);
      }.bind(this)
    })
  },

  postDisplay: function (id) {
    var post = new MediaPassport.Models.Post({id: id});
    post.fetch()
    var view = new MediaPassport.Views.PostDisplay({
      model: post,
      session: this.session
    });

    this._swapView(view);
  },

  watchlist: function () {
    var watchlist = new MediaPassport.Collections.Watchlist();
    watchlist.fetch();
    var view = new MediaPassport.Views.WatchlistDisplay({
      collection: watchlist
    });

    this._swapView(view);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;

    this.$rootEl.html(this.currentView.render().$el);

  }
})
