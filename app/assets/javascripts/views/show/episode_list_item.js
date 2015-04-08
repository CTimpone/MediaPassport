MediaPassport.Views.EpisodeListItem = Backbone.CompositeView.extend({
  tagName: "li",

  className: "episode-list-item",

  initialize: function (options) {
    this.show = options.show;
    this.listenTo(this.model, "sync", this.render);
  },

  template: JST['show/episode_list_item'],

  render: function () {
    var content = this.template({episode: this.model, show: this.show});
    this.$el.html(content);

    return this;
  }
})
