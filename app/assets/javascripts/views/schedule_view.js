MediaPassport.Views.ScheduleView = Backbone.CompositeView.extend({
  tagName: "schedule",

  template: JST["schedule"],

  initialize: function (options) {
    this.collection = new MediaPassport.Collections.ApiSchedule();
    this.collection.fetch();
    this.shows = options.shows;
    this.listenTo(this.collection, "sync", this.renderSchedule)
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  renderSchedule: function () {
    this.collection.each(function (episode) {
      var dbShow = this.shows.CRU(_.clone(episode.show().attributes), {});

    }.bind(this));
  }
})
