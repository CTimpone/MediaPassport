MediaPassport.Views.ScheduleView = Backbone.CompositeView.extend({
  template: JST["schedule"],

  initialize: function (options) {
    this.collection = new MediaPassport.Collections.ApiSchedule();
    this.collection.fetch();
    this.shows = options.shows;
    this._loaded = 0;

    var callback = function () {
      this._loaded += 1;
      this.renderSchedule();
    }.bind(this);

    this.listenToOnce(this.collection, "sync", callback)
    this.listenToOnce(this.shows, "sync", callback)
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

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
              show_title: escape(show.get('title').replace(/ /g, '_')),
              episode_title: escape(episode.get('title').replace(/ /g, '_'))
            });
            checkExistence.fetch({
              success: function () {
                dbEpisode = checkExistence.CRU(_.clone(episode.attributes));
                dbEpisode.set({airtime: episode.escape('airtime'), network: dbShow.escape('network')})
                var subView = new MediaPassport.Views.ScheduleGridItem({
                  model: dbEpisode
                });
                this.addSubview('.schedule', subView);
              }.bind(this)
            })
          }.bind(this)
        });
      }.bind(this));
    }
  }
})
