MediaPassport.Collections.Posts = Backbone.Collection.extend({
  model: MediaPassport.Models.Post,

  url: "/posts",

  comparator: function (a) {
    var date = new Date(a.get("created_at"));
    return -date.getTime();
  },

  initialize: function (models, options) {
    this.episode_id = options.episode_id;
  }
});
