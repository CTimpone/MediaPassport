MediaPassport.Views.EpisodeScheduleItem = Backbone.CompositeView.extend({
  template: JST["landing/schedules/episode_schedule_item"],

  tagName: "li",

  className: "episode-schedule-item",

  render: function () {
    var content = this.template({
      episode: this.model
    });

    this.$el.html(content);
    return this;
  }
});
