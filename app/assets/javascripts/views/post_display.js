MediaPassport.Views.PostDisplay = Backbone.CompositeView.extend({
  template: JST["post_display"],

  initialize: function (options) {
    this.session = options.session;
    this.listenTo(this.model, "sync", this.render);

    this.selector = '.comment-list';
  },

  render: function () {
    var content = this.template({post: this.model});
    this.$el.html(content);

    if (this.model.comment_tree) {
      this.children = this.model.comment_tree[""];

      this.renderChildren();
    }
    //
    // if (!this.session.isNew()) {
    //   var newCommentSubview = new MediaPassport.Views
    // }


    return this;
  },

  renderChildren: function () {
    _.each(this.children, function (comment) {
      var commentSubview = new MediaPassport.Views.CommentDisplay({
        post: this.model,
        comment: new MediaPassport.Models.Comment(comment)
      });
      this.addSubview(this.selector, commentSubview);
    }.bind(this));

    return this;
  }
});
