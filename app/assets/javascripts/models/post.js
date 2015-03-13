MediaPassport.Models.Post = Backbone.Model.extend({
  urlRoot: "/posts",

  initialize: function (options) {
    this.id = options.id;
  },

  parse: function (response) {
    if (response.comment_tree) {
      this.comment_tree = response.comment_tree;
      delete response.comment_tree
    }

    return response
  }
})
