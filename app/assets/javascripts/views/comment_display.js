MediaPassport.Views.CommentDisplay = Backbone.CompositeView.extend({
  template: JST["comment_display"],

  tagName: "li",

  initialize: function (options) {
    this.comment = options.comment;
    this.session = options.session;
    this.post = options.post;
    this.selector = '.comment-list-' + this.comment.id
    this.children = this.post.comment_tree[String(this.comment.id)];
  },

  render: function () {
    var content = this.template({comment: this.comment});
    this.$el.html(content);


    this.renderChildren();
    console.log(this.comment)
    if (!this.session.isNew() && this.session.escape('username') !== this.comment.escape('author')) {
      var newCommentSubview = new MediaPassport.Views.NewComment({
        collection: this.collection,
        post: this.post,
        parent_id: this.comment.id,
        author: this.session.get('author')
      })
      this.addSubview('.nested-comment-form[data-id="' + this.comment.id + '"]', newCommentSubview);
    }

    return this;
  },

  renderChildren: function () {
    if (this.children) {
      _.each(this.children, function (comment) {
        var commentSubview = new MediaPassport.Views.CommentDisplay({
          post: this.post,
          session: this.session,
          comment: new MediaPassport.Models.Comment(comment)
        });

        this.addSubview(this.selector, commentSubview);
      }.bind(this))
    }

    return this;
  }
});
