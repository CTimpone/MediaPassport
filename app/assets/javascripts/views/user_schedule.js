MediaPassport.Views.UserSchedule = Backbone.CompositeView.extend({
  template: JST["user_schedule"],

  tagName: "section",

  className: "user-schedule-section group",

  initialize: function (options) {
    this.shows = options.shows;
    this.watchlist = options.watchlist;
    this.localSchedule = options.localSchedule;

    console.log(this.watchlist);

    this.localLoad = options.localLoad;
    this.apiLoad = options.apiLoad;
    this.watchlistLoad = options.watchlistLoad;

    this.skipCRU = options.skipCRU;

    if (this.skipCRU) {
      this.developList();
    }

    this.listenToOnce(this.collection, "sync", function () {
      this.apiLoad = true;
      this.generateSchedule();
    }.bind(this));

    this.listenTo(this.localSchedule, "sync", this.developList);

    this.listenToOnce(this.watchlist, "sync", function () {
      this.watchlistLoad = true;
      this.developList();
    }.bind(this));
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

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

            }
          }, that);
        }
      }.bind(this));
    }
  },

  developList: function () {
    $('.watched-show-episodes').empty();
    if (this.watchlistLoad) {
      this.watchlist.each(function (item) {
        var watchedEpisodes = this.localSchedule.where({show_id: item.get('show_id')})
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
