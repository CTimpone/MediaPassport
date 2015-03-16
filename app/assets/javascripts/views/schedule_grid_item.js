MediaPassport.Views.ScheduleGridItem = Backbone.View.extend({
  tagName: "td",

  template: JST["schedule_grid_item"],

  attributes: function () {
    if (this.model) {
      x = this.model
      var cols = Math.floor(parseInt(this.model.get('runtime')) / 30);
    } else {
      var cols = 1;
    }
    return {colspan: cols}
  },

  render: function () {
    var content = this.template({episode: this.model});
    this.$el.html(content);

    return this;
  }
})
