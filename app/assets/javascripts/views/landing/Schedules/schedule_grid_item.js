MediaPassport.Views.ScheduleGridItem = Backbone.View.extend({
  tagName: "td",

  template: JST["landing/schedules/schedule_grid_item"],

  attributes: function () {
    if (this.model) {
      this.cols = Math.floor(parseInt(this.model.get('runtime')) / 30);
      var pop = "schedule-cell-new"
    } else {
      this.cols = 1;
      var pop = "schedule-cell-none"
    }

    if (this.cols === 0) {
      this.cols = 1;
    }
    return {
      colspan: this.cols,
      class: pop
    }
  },

  render: function () {
    var content = this.template({
      episode: this.model,
      cols: this.cols
    });
    this.$el.html(content);

    return this;
  }
})
