MediaPassport.Views.UserSchedule = Backbone.CompositeView.extend({
  template: JST["user_schedule"],

  tagName: "section",

  className: "user-schedule-section group",

  initialize: function (options) {
    this.shows = options.shows;
    this.watchlist = options.watchlist;

    this.localLoad = options.localLoad;
    this.apiLoad = options.apiLoad;
    this.watchlistLoad = options.watchlistLoad;

    this.skipCRU = options.skipCRU;

    this.listenToOnce(this.collection, "sync", function () {
      this.apiLoad = true;
      this.render();
    }.bind(this));

    this.listenToOnce(this.shows, "sync", function () {
      this.localLoad = true;
      this.render();
    }.bind(this));

    this.listenToOnce(this.watchlist, "sync", function () {
      this.watchlistLoad = true;
    }.bind(this));
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    if (this.skipCRU) {
      this.developList();
    } else if (this.localLoad && this.apiLoad) {
      this.generateSchedule();
    }

    return this;
  },

  generateSchedule: function () {
    if (this.localLoad && this.apiLoad) {
      var count = 0;
      var len = this.collection.length;
      col = this.collection;
      this.collection.each(function (episode) {
        var dbEpisode;
        var dbShow = this.shows.CRU(_.clone(episode.show().attributes), {
          success: function () {
            var checkExistence = new MediaPassport.Collections.Episodes([], {
              verify: true,
              show_title: encodeURIComponent(episode.show().get('title').replace(/ /g, '_')),
              episode_title: encodeURIComponent(episode.get('title').replace(/ /g, '_'))
            });
            checkExistence.fetch({
              success: function () {
                count += 1;
                dbEpisode = checkExistence.CRU(_.clone(episode.attributes));
                if (count === len) {
                  if (this.watchlistLoad) {
                    this.developList();
                  } else {
                    this.stopListening(this.watchlist);
                    this.listenToOnce(this.watchlist, "sync", function () {
                      this.watchlistLoad = true;
                      this.developList();
                    }.bind(this));
                  }
                }
              }.bind(this)
            })
          }.bind(this)
        });
      }.bind(this));
    }
  },

  developList: function () {
    this.skipCRU = true;
    this.watchlist.each(function (item) {
      var watchedEpisodes = this.collection.where({show_maze_id: item.get('show_maze_id')})
      if (watchedEpisodes.length > 0) {
        _.each(watchedEpisodes, function (episode) {
          var subview = new MediaPassport.Views.EpisodeScheduleItem({
            model: episode
          });
          this.addSubview('.watched-show-episodes', subview);
        }.bind(this));
      }
    }.bind(this));
  }
})
