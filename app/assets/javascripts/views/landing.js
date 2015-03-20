MediaPassport.Views.Landing = Backbone.CompositeView.extend({
  template: JST["landing"],

  events: {
    "click .schedule-tabs button": "switchView"
  },

  initialize: function (options) {
    this.session = options.session;
    this.shows = options.shows;
    this.localLoad = false;
    this.apiLoad = false;
    this.skipCRU = false;

    this.signedIn = !options.initial;

    this.watchlist = new MediaPassport.Collections.Watchlist();
    this.watchlistLoad = false;

    this.shows.fetch({
      success: function () {
        this.localLoad = true;
      }.bind(this)
    });

    this.collection = new MediaPassport.Collections.ApiSchedule();
    this.collection.fetch({
      success: function () {
        this.apiLoad = true;
      }.bind(this)
    });

    this._style = "grid";
    this.listenTo(this.session, "destroy", function () {
      this.signedIn = false;
      if (this._style = "personal") {
        this._style = "list";
      }
      this.render();
    }.bind(this));

    this.listenToOnce(this.session, "sync", function () {
      this.signedIn = !this.session.isNew();
      this.render();
    }.bind(this));

    this.session.on
  },

  render: function () {
    var content = this.template({
      signedIn: this.signedIn,
      session: this.session
    });
    this.$el.html(content);

    if (this.subviews('.schedule-container').length === 0) {
      this.removeSubviews();
    }

    var timer = setInterval(function() {
      $('.schedule-tabs button[type="' + this._style +'"]').addClass('active-schedule-view');
      $('.schedule-tabs button').prop('disabled', false);
      $('.schedule-tabs button[type="' + this._style +'"]').prop('disabled', true);
      if (this.signedIn && !this.watchlistLoad) {
        this.watchlist.fetch({
          success: function () {
            this.watchlistLoad = true;
          }.bind(this)
        });
      }
      clearInterval(timer);
    }.bind(this), 1);

    if (this._style === "grid") {
      var scheduleView = new MediaPassport.Views.ScheduleView({
        shows: this.shows,
        collection: this.collection,
        apiLoad: this.apiLoad,
        localLoad: this.localLoad,
        skipCRU: this.skipCRU,
        session: this.session
      });

    } else if (this._style === "list"){
      var scheduleView = new MediaPassport.Views.ScheduleList({
        shows: this.shows,
        collection: this.collection,
        apiLoad: this.apiLoad,
        localLoad: this.localLoad,
        skipCRU: this.skipCRU,
        session: this.session
      });

    } else if (this._style === "personal" && this.signedIn) {
      var scheduleView = new MediaPassport.Views.UserSchedule({
        shows: this.shows,
        collection: this.collection,
        watchlist: this.watchlist,
        apiLoad: this.apiLoad,
        localLoad: this.localLoad,
        watchlistLoad: this.watchlistLoad,
        skipCRU: this.skipCRU,
        session: this.session
      });

    }

    this.currentView = scheduleView;
    this.addSubview('.schedule-container', scheduleView);

    return this;
  },

  switchView: function (event) {
    this._style = $(event.currentTarget).attr('type');
    $('.schedule-tabs button').removeClass('active-schedule-view');

    this.apiLoad = this.currentView.apiLoad;
    this.localLoad = this.currentView.localLoad;
    this.skipCRU = this.currentView.skipCRU;

    if (this.currentView.watchlistLoad) {
      this.watchlistLoad = this.currentView.watchlistLoad;
    }

    this.currentView.remove();
    this.render();
  }
});
