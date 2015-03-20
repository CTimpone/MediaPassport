MediaPassport.Views.EpisodePersonalItem = Backbone.CompositeView.extend({
  template: JST["episode_personal_item"],

  tagName: "li",

  className: "episode-personal-item",

  render: function () {

    var content = this.template({
      episode: this.model
    });

    this.$el.html(content);
    return this;
  }
});
