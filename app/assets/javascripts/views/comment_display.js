MediaPassport.Views.CommentDisplay = Backbone.CompositeView.extend({
  template: JST["comment_display"],

  tagName: "li",

  initialize: function (options) {
    this.parentView = options.parentView;
    this.comment = options.comment;
    this.session = options.session;
    this.post = options.post;
    this.selector = '.comment-list-' + this.comment.id
    this.children = this.post.comment_tree[String(this.comment.id)];
    this.listenTo(this.comment, "sync", this.changeBody)
  },

  events: {
    "click .show-stuff": "toggleForm",
    "click .endorse": "toggleEndorse"
  },

  render: function () {
    var signedIn = !this.session.isNew();
    var creator = this.session.escape('username') === this.comment.escape('author');

    if (signedIn && !creator) {
      this.actionText = "Reply to Comment"
    } else if (signedIn && creator) {
      this.actionText = "Edit Comment"
    }
    var content = this.template({
      comment: this.comment,
      actionText: this.actionText
    });
    this.$el.html(content);

    this.renderChildren();
    // if (signedIn && !creator) {
    //   var newCommentSubview = new MediaPassport.Views.NewComment({
    //     collection: this.collection,
    //     post: this.post,
    //     parent_id: this.comment.id,
    //     author: this.session.get('author')
    //   })
    //   this.addSubview('.nested-comment-form[data-id="' + this.comment.id + '"]', newCommentSubview);
    // } else if (signedIn && creator) {
    //   var updateCommentSubview = new MediaPassport.Views.UpdateComment({
    //     model: this.comment
    //   })
    //   this.addSubview('.nested-comment-form[data-id="' + this.comment.id + '"]', updateCommentSubview);
    // }

    return this;
  },

  renderChildren: function () {
    if (this.children) {
      _.each(this.children, function (comment) {
        var commentSubview = new MediaPassport.Views.CommentDisplay({
          post: this.post,
          session: this.session,
          comment: new MediaPassport.Models.Comment(comment),
          parentView: this.parentView
        });

        this.addSubview(this.selector, commentSubview);
      }.bind(this))
    }

    return this;
  },

  changeBody: function (event) {
    var selector = '.content[data-id="' + this.comment.id + '"]';
    var $content = this.$el.find(selector);
    $content.html(this.comment.escape('content'));

    return this;
  },

  toggleForm: function (event) {
    if ($(event.currentTarget).data("id") === this.comment.id) {
      var signedIn = !this.session.isNew();
      var creator = this.session.escape('username') === this.comment.escape('author');

      this.parentView.regexRemoveAllFromSelector(/nested-comment-form/);
      if (signedIn && !creator) {
        var newCommentSubview = new MediaPassport.Views.NewComment({
          collection: this.collection,
          post: this.post,
          parent_id: this.comment.id,
          author: this.session.get('author')
        })
        this.parentView.addSubview('.nested-comment-form[data-id="' + this.comment.id + '"]', newCommentSubview);
      } else if (signedIn && creator) {
        var updateCommentSubview = new MediaPassport.Views.UpdateComment({
          model: this.comment
        })
        this.parentView.addSubview('.nested-comment-form[data-id="' + this.comment.id + '"]', updateCommentSubview);
      }
    }
  },

  toggleEndorse: function (event) {
    var parent = $($(event.currentTarget).parent());
    if (parent.data("id") === this.comment.id) {
      parent.html("<p>Processing</p>")
      var endorsements = new MediaPassport.Collections.Endorsements({
        comment_id: this.comment.id,
        post_id: this.comment.escape('post_id')
      })

      endorsements.create({}, {
        success: function () {
          if (this.comment.escape('endorsed') === "true") {
            this.comment.set({endorsed: false});
            parent.html('<a class="endorse" href="javascript:void(0)">Endorse</a>')
          } else {
            this.comment.set({endorsed: true});
            parent.html('<a class="endorse" href="javascript:void(0)">Un-Endorse</a>')
          }
        }.bind(this)
      })
    }
  },
});
