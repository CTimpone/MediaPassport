MediaPassport.Views.ScheduleGridItem = Backbone.View.extend({
  tagName: "td",

  template: JST["schedule_grid_item"],

  render: function () {
    var content = this.template({episode: this.model});
    this.$el.html(content);

    return this;
  }
})
