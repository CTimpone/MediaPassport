MediaPassport.Views.ScheduleGridItem = Backbone.View.extend({
  tagName: "td",

  template: JST["schedule_grid_item"],

  attributes: function () {
    if (this.model) {
      var cols = Math.floor(parseInt(this.model.get('runtime')) / 30);
      var pop = "schedule-cell-new"
    } else {
      var cols = 1;
      var pop = "schedule-cell-none"
    }
    return {
      colspan: cols,
      class: pop
    }
  },

  render: function () {
    var content = this.template({episode: this.model});
    this.$el.html(content);

    return this;
  }
})
