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
        this.shows.CRU(_.clone(episode.show().attributes), {})
        count += 1;
        if (count === this.collection.length) {

          var that = this;

          this.shows.batchSave({
            success: function () {
              var data = that.collection.map(function (model) {
                return _.clone(model.attributes);
              });


              $.ajax({
                type: "POST",
                url: '/episodes/batch_verify',
                data: {episodes: data},
                dataType: 'json',
              });


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
          }, that);
        }x
      }.bind(this));
    }
  },

  developList: function () {
    this.skipCRU = true;
    this.watchlist.each(function (item) {
      var watchedEpisodes = this.collection.where({show_maze_id: item.get('show_maze_id')})
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
})
