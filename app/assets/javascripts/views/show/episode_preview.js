MediaPassport.Views.EpisodePreview = Backbone.View.extend({

  tagName: "aside",

  className: "preview group",

  render: function () {
    var content = this.template({
      episode: this.model,
      image_url: this.model.escape('image_url')
    });

    this.$el.html(content);

    return this
  },

  template: JST["show/episode_preview"]
})
