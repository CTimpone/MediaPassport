MediaPassport.Views.ScheduleView = Backbone.CompositeView.extend({
  template: JST["schedule"],

  tagName: "section",

  className: "schedule-section",

  initialize: function (options) {
    this.collection = new MediaPassport.Collections.ApiSchedule();
    this.collection.fetch();
    this.shows = options.shows;
    this._loaded = 0;

    var callback = function () {
      this._loaded += 1;
      this.render();
      this.generateSchedule();
    }.bind(this);

    this.listenToOnce(this.collection, "sync", callback)
    this.listenToOnce(this.shows, "sync", callback)
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    if (this._loaded === 2) {
      this.networks = this.collection.map(function (model) {
        return model.show().escape('network').replace(/&amp;/g, '&');
      });
      this.networks = _.uniq(this.networks);

      _.each(this.networks, function (network) {
        var row = "<tr class='grid-row' network=" +
                  network.replace(/ /g, '_') + "><td class='network-name'>" +
                  network + "</td></tr>";
        $('.schedule').append($(row));
      });

      this.times = _.uniq(this.collection.pluck("airtime"));
      _.each(this.times, function (time) {
        var base = parseInt(time.slice(0, 2));
        if (base > 12) {
          var USTime = String(Math.abs(base - 12)) + time.slice(2, 5);
        } else if (base === 0) {
          var USTime = "12" + time.slice(2, 5);
        } else if (time === "") {
          var USTime = "12:00";
        } else {
          var USTime = time.slice(1, 5);
        }
        var col = "<th>" + USTime + "</th>";
        $('.grid-header').append($(col));
      });
    }

    return this;
  },

  generateSchedule: function () {
    if (this._loaded === 2) {
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
                  this.developGrid();
                }
              }.bind(this)
            })
          }.bind(this)
        });
      }.bind(this));
    }
  },

  developGrid: function () {
    _.each(this.networks, function (network) {
      var newEpisodes = this.collection.where({network: network});
      var tempCollection = new MediaPassport.Collections.ApiEpisodes(newEpisodes)
      var selector = '.grid-row[network="' +
                      network.replace(/&amp;/g, '&').replace(/ /g, '_') +
                      '"]';
      var skips = 1;
      _.each(this.times, function (time) {
        if (skips === 1) {
          var episode = tempCollection.where({airtime: time});
          if (episode.length !== 0) {
            skips =  Math.floor(parseInt(episode[0].get('runtime')) / 30);
            var subview = new MediaPassport.Views.ScheduleGridItem({
              model: episode[0]
            });
          } else {
            var subview = new MediaPassport.Views.ScheduleGridItem({
              model: null
            });
          }
          this.addSubview(selector, subview);
        } else {
          skips -= 1;
        }
      }.bind(this));
    }.bind(this));
  }
})
