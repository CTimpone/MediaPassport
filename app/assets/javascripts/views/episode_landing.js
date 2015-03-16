MediaPassport.Views.EpisodeLanding = Backbone.CompositeView.extend({
  template: JST["episode_landing"],

  className: "group",

  initialize: function (options) {
    this.session = options.session;
    this.listenTo(this.session, "change create", this.render)
    this.listenTo(this.model.posts(), "add", this.addPost)
  },

  render: function () {
    var content = this.template({episode: this.model, session: this.session});
    this.$el.html(content);

    if (this.model.posts()) {
      this.model.posts().each(function (post) {
        var subView = new MediaPassport.Views.EpisodePostListItem({model: post});
        this.addSubview('.post-list', subView)
      }.bind(this))
    }

    if (!this.session.isNew()) {
      var postForm = new MediaPassport.Views.NewPost({
        model: this.model,
        collection: this.model.posts()
      });
      this.addSubview('.post-form', postForm)
    }

    if (!this.session.isNew() && this.model.escape("current_user_rating")) {
      var timer = setInterval(function () {
        var select = $('.current-user-rating');
        select.val(this.model.escape("current_user_rating"));
        this.events = {"change .current-user-rating": "userRating"};
        clearInterval(timer);
      }.bind(this), 1);
    }

    return this;
  },

  addPost: function (event) {
    var post = this.model.posts().last();

    var subView = new MediaPassport.Views.EpisodePostListItem({model: post});
    this.addSubview('.post-list', subView)
  }
})
