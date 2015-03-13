MediaPassport.Views.PostDisplay = Backbone.CompositeView.extend({
  template: JST["post_display"],

  initialize: function (options) {
    this.session = options.session;
    this.listenTo(this.model, "sync", this.render);
    this.newComments = new MediaPassport.Collections.Comments();
    this.selector = '.comment-list';

    this.listenTo(this.newComments, "add", this.addComment);
    this.listenTo(this.session, "change create", this.render);
  },

  render: function () {
    var content = this.template({post: this.model});
    this.$el.html(content);

    if (this.model.comment_tree) {
      this.children = this.model.comment_tree[""];

      this.renderChildren();
    }

    if (!this.session.isNew()) {
      var newCommentSubview = new MediaPassport.Views.NewComment({
        collection: this.newComments,
        post: this.model,
        parent_id: null,
        author: this.session.get('author')
      })
      this.addSubview(".new-comment", newCommentSubview);
    }


    return this;
  },

  renderChildren: function () {
    _.each(this.children, function (comment) {
      var commentSubview = new MediaPassport.Views.CommentDisplay({
        post: this.model,
        comment: new MediaPassport.Models.Comment(comment),
        session: this.session
      });
      this.addSubview(this.selector, commentSubview);
    }.bind(this));

    return this;
  },

  addComment: function (event) {
    var comment = this.newComments.last();
    comment.set({author: this.session.get('username')});
    console.log(comment);
    if (comment.get('parent_id') === null) {
      var selector = this.selector
    } else {
      var selector = ".comment-list-" + comment.get('parent_id');
    }

    var commentSubview = new MediaPassport.Views.CommentDisplay({
      post: this.model,
      comment: comment,
      session: this.session
    });

    this.addSubview(selector, commentSubview);

    return this;
  }
});
