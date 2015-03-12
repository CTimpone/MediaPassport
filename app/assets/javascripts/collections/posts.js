MediaPassport.Collections.Posts = Backbone.Collection.extend({
  model: MediaPassport.Models.Post,

  url: "/posts",

  initialize: function (models, options) {
    this.episode_id = options.episode_id;
  }
});
