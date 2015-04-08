MediaPassport.Views.UserSchedule = MediaPassport.Views.ScheduleView.extend({
  template: JST["landing/schedules/user_schedule"],

  tagName: "section",

  className: "user-schedule-section group",

  initialize: function (options) {
    this.shows = options.shows;
    this.watchlist = options.watchlist;
    this.localSchedule = options.localSchedule;

    this.localLoad = options.localLoad;
    this.apiLoad = options.apiLoad;
    this.watchlistLoad = options.watchlistLoad;

    this.listenToOnce(this.collection, "sync", function () {
      this.apiLoad = true;
      this.generateSchedule();
    }.bind(this));

    this.listenTo(this.localSchedule, "sync", this.developList);

    this.listenToOnce(this.watchlist, "sync", function () {
      this.watchlistLoad = true;
      this.render();
    }.bind(this));
  },

  render: function () {
    var content = this.template({
      watchlist: this.watchlist
    });

    this.$el.html(content);

    this.developList();

    return this;
  },

  developList: function () {
    $('.watched-show-episodes').empty();
    if (this.watchlistLoad) {
      this.watchlist.each(function (item) {
        var watchedEpisodes = this.localSchedule.where({show_id: item.get('show_id')});
        if (watchedEpisodes.length > 0) {
          _.each(watchedEpisodes, function (episode) {
            var subview = new MediaPassport.Views.EpisodePersonalItem({
              model: episode
            });
            this.addSubview('.watched-show-episodes', subview);
          }.bind(this));
        }
      }.bind(this));
    }
  }
})
