MediaPassport.Views.Landing = Backbone.CompositeView.extend({
  template: JST["landing"],

  initialize: function (options) {
    this.shows = options.shows
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    var scheduleView = new MediaPassport.Views.ScheduleView({
      shows: this.shows
    });
    this.addSubview('.schedule-container', scheduleView);

    return this;
  }
});
