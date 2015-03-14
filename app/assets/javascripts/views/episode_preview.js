MediaPassport.Views.EpisodePreview = Backbone.View.extend({

  tagName: "aside",

  className: "preview",

  render: function () {
    var content = this.template({
      episode: this.model,
      image_url: this.model.escape('image_url')
    });
    this.$el.html(content);

    return this
  },

  template: JST["episode_preview"]
})
