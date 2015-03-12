MediaPassport.Views.EpisodeListItem = Backbone.CompositeView.extend({
  tagName: "li",

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
  },

  template: JST['episode_list_item'],

  render: function () {
    var content = this.template({episode: this.model});
    this.$el.html(content);

    return this;
  }
})
