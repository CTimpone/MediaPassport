MediaPassport.Views.CommentDisplay = Backbone.CompositeView.extend({
  template: JST["comment_display"],

  tagName: "li",

  initialize: function (options) {
    this.comment = options.comment;
    this.post = options.post;
    this.selector = '.comment-list-' + this.comment.id
    this.children = this.post.comment_tree[String(this.comment.id)];

  },

  render: function () {
    console.log(this.comment)
    var content = this.template({comment: this.comment});
    this.$el.html(content);


    this.renderChildren();



    return this;
  },

  renderChildren: function () {
    if (this.children) {
      _.each(this.children, function (comment) {
        var commentSubview = new MediaPassport.Views.CommentDisplay({
          post: this.post,
          comment: new MediaPassport.Models.Comment(comment)
        });

        this.addSubview(this.selector, commentSubview);
      }.bind(this))
    }

    return this;
  }
});
