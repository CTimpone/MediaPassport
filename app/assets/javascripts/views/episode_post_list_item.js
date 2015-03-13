MediaPassport.Views.EpisodePostListItem = Backbone.View.extend({
  template: JST["post_list_item"],

  tagName: "li",

  className: "post-item",
  
  render: function () {
    var content = this.template({post: this.model});
    this.$el.html(content);

    return this;
  }
})
