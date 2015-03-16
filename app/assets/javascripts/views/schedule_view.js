MediaPassport.Views.ScheduleView = Backbone.CompositeView.extend({
  tagName: "schedule",

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
              show_title: show.escape('title'),
              episode_title: episode.escape('title')
            });
            checkExistence.fetch({
              success: function () {
                dbEpisode = checkExistence.CRU(_.clone(episode.attributes));

              }.bind(this)
            })
          }.bind(this)
        });
      }.bind(this));
    }
  }
})
