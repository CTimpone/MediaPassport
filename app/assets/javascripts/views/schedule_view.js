MediaPassport.Views.ScheduleView = Backbone.CompositeView.extend({
  template: JST["schedule"],

  initialize: function (options) {
    this.collection = new MediaPassport.Collections.ApiSchedule();
    this.collection.fetch();
    this.shows = options.shows;
    this._loaded = 0;

    var callback = function () {
      this._loaded += 1;
      this.render();
      this.renderSchedule();
    }.bind(this);

    this.listenToOnce(this.collection, "sync", callback)
    this.listenToOnce(this.shows, "sync", callback)
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    if (this._loaded === 2) {
      var networks = this.collection.map(function (model) {
        return model.show().escape('network').replace(/&amp;/g, '&');
      });
      networks = _.uniq(networks);
      _.each(networks, function (network) {
        var row = "<tr class='grid-row' network=" +
                  network.replace(/ /g, '_') + "><td>" + network + "</td></tr>";
        $('.schedule').append($(row));
      });
      var times = _.uniq(this.collection.pluck("airtime"));
      _.each(times, function (time) {
        var col = "<tr class='grid-row'><th>" + time + "</th></tr>";
        $('.grid-header').append($(col));
      });
    }

    return this;
  },

  renderSchedule: function () {
    if (this._loaded === 2) {
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
                dbEpisode = checkExistence.CRU(_.clone(episode.attributes));
                dbEpisode.set({
                  airtime: episode.escape('airtime'),
                  show_title: dbShow.escape('title')
                })
                var subView = new MediaPassport.Views.ScheduleGridItem({
                  model: dbEpisode
                });
                var selector = '.grid-row[network="' +
                                dbShow.escape('network').replace(/&amp;/g, '&').replace(/ /g, '_') +
                                '"]';
                console.log(selector);
                this.addSubview(selector, subView);
              }.bind(this)
            })
          }.bind(this)
        });
      }.bind(this));
    }
  }
})
