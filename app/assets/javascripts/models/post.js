MediaPassport.Models.Post = Backbone.Model.extend({
  urlRoot: "/posts",

  initialize: function (options) {
    this.id = options.id;
  },

  parse: function (response) {
    if (Object.keys(response.comment_tree).length === 0) {
      delete response.comment_tree
    }

    return response
  }
})
