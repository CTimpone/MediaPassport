MediaPassport.Views.NewComment = Backbone.View.extend({
  tagName: "form",

  className: "group",

  events: {
    "submit": "createComment"
  },

  template: JST["post/comment_form"],

  initialize: function (options) {
    this.post = options.post;
    this.parent_id = options.parent_id;
    this.author = options.author;
  },

  render: function () {
    var comment = new MediaPassport.Models.Comment();
    var content = this.template({comment: comment});
    this.$el.html(content);

    return this;
  },

  createComment: function (event) {
    event.preventDefault();
    var data = this.$el.serializeJSON();
    data.parent_id = this.parent_id;
    data.post_id = this.post.id;
    data.author = this.author;
    this.collection.create(data, {
      wait: true,
      success: function () {
        if (data.parent_id !== null) {
          this.remove();
        }
        this.post.fetch();
      }.bind(this),
      error: function (obj, response) {
        this.render();
        _.each(response.responseJSON.errors, function (error) {
          $('.errors').append($("<li>" + error + "</li>"))
        }.bind(this));
      }.bind(this)
    })
  }
})
