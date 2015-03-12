MediaPassport.Views.EpisodeLanding = Backbone.CompositeView.extend({
  template: JST["episode_landing"],

  initialize: function (options) {
    this.session = options.session;
    this.listenTo(this.session, "change create", this.render)
    this.listenTo(this.model.posts(), "add", this.addPost)
  },

  render: function () {
    var content = this.template({episode: this.model, session: this.session});
    this.$el.html(content);

    if (!this.session.isNew()) {
      var postForm = new MediaPassport.Views.NewPost({
        model: this.model,
        collection: this.model.posts()
      });
      this.addSubview('.post-form', postForm)
    }

    return this;
  },

  addPost: function (event) {
    var newestPost = this.model.posts().last();
    console.log(newestPost)
    $('.post-list').append($("<li><strong>"+ newestPost.escape('title') +
                            "</strong><p>" + newestPost.escape('content') +
                            "</p></li>"))
  }
})
