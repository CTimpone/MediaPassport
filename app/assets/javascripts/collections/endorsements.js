MediaPassport.Collections.Endorsements = Backbone.Collection.extend({

  url: function () {
    if (this.comment_id) {
      return "/posts/" + this.post_id +
             "/comments/" + this.comment_id +
             "/endorse"
    } else {
      return "/posts/" + this.post_id +
             "/endorse"
    }
  },

  initialize: function (options) {
    this.post_id = options.post_id;
    if (options.comment_id) {
      this.comment_id = options.comment_id;
    }
  }
})
