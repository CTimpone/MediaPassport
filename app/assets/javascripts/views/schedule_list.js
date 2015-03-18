MediaPassport.Views.ScheduleList = Backbone.CompositeView.extend({
  template: JST["schedule_list"],

  tagName: "section",

  className: "schedule-list-section",

  initialize: function (options) {
    this.shows = options.shows;

    this.localLoad = options.localLoad;
    this.apiLoad = options.apiLoad;

    this.skipCRU = options.skipCRU;

    this.listenToOnce(this.collection, "sync", function () {
      this.apiLoad = true;
      this.render();
    }.bind(this));

    this.listenToOnce(this.shows, "sync", function () {
      this.localLoad = true;
      this.render();
    }.bind(this));
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    if (this.localLoad && this.apiLoad) {
      this.networks = this.collection.map(function (model) {
        return model.show().escape('network').replace(/&amp;/g, '&');
      });
      this.networks = _.uniq(this.networks).sort();

      if (this.skipCRU) {
        this.developLists();
      } else {
        this.generateSchedule();
      }
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
                  this.developLists();
                }
              }.bind(this)
            })
          }.bind(this)
        });
      }.bind(this));
    }
  },

  developLists: function () {
    this.skipCRU = true;
    
    _.each(this.networks, function (network) {
      var newEpisodes = this.collection.where({network: network});
      var networkSubview = new MediaPassport.Views.NetworkListSchedule({
        collection: newEpisodes,
        model: network
      });
      this.addSubview('.lists-container', networkSubview);
    }.bind(this));
  }
})
