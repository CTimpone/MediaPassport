MediaPassport.Views.EpisodeLanding = Backbone.CompositeView.extend({
  template: JST["episode_landing"],

  initialize: function (options) {
    this.session = options.session;
    this.listenTo(this.session, "change create", this.render)
  },

  render: function () {
    var content = this.template({episode: this.model, session: this.session});
    this.$el.html(content);

    if (!this.session.isNew()) {
      var postForm = new MediaPassport.Views.NewPost();
      this.addSubview('.post-form', postForm)
    }
    return this;
  }
})
