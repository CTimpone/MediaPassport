MediaPassport.Views.NewPost = Backbone.View.extend({
  template: JST["post_form"],

  events: {
    "submit .new-post": "createPost"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  createPost: function (event) {
    event.preventDefault();
    var data = $(event.target).serializeJSON();
    data.episode_id = this.collection.episode_id;
    this.collection.create(data, {wait: true})
  }


})
