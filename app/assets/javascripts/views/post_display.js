MediaPassport.Views.PostDisplay = Backbone.CompositeView.extend({
  template: JST["post_display"],

  events: {
    "click .endorse": "togglePostEndorse"
  },

  initialize: function (options) {
    this.session = options.session;
    this.listenTo(this.model, "sync", this.render);
    this.newComments = new MediaPassport.Collections.Comments();
    this.selector = '.comment-list';

    this.listenTo(this.newComments, "add", this.addComment);
    this.listenTo(this.session, "change create", this.reload);
  },

  render: function () {
    var content = this.template({
      post: this.model,
      session: this.session
    });
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
        session: this.session,
        collection: this.newComments,
        parentView: this
      });
      this.addSubview(this.selector, commentSubview);
    }.bind(this));

    return this;
  },

  addComment: function (event) {
    var comment = this.newComments.last();
    comment.set({author: this.session.get('username')});

    if (comment.get('parent_id') === null) {
      var selector = this.selector
    } else {
      var selector = ".comment-list-" + comment.get('parent_id');
    }

    var commentSubview = new MediaPassport.Views.CommentDisplay({
      post: this.model,
      comment: comment,
      session: this.session,
      collection: this.newComments
    });

    this.addSubview(selector, commentSubview);

    return this;
  },

  reload: function (event) {
    this.model.fetch();
    this.render();
  },

  togglePostEndorse: function (event) {
    var parent = $($(event.currentTarget).parent());
    parent.html("<p>Processing</p>")
    var endorsements = new MediaPassport.Collections.Endorsements({
      post_id: this.model.id
    })
    endorsements.create({}, {
      success: function () {
        if (this.model.escape('endorsed') === "true") {

          this.model.set({
            endorsed: false,
            total_points: parseInt(this.model.escape('total_points')) - 1
          });

          var str='<strong>' + this.model.escape('total_points') +'</strong>' +
            '<a class="endorse" href="javascript:void(0)">+</a>';

          parent.html(str)
        } else {
          this.model.set(
            {endorsed: true,
            total_points: parseInt(this.model.escape('total_points')) + 1
          });

          var str = '<strong>' + this.model.escape('total_points') +'</strong>' +
            '<a class="endorse" href="javascript:void(0)">-</a>';

          parent.html(str)
        }
      }.bind(this)
    })
  },
});
