MediaPassport.Models.Episode = Backbone.Model.extend({
  url: function () {
    if (this.fTitle && this.fShowTitle) {
      return "/shows/" +
        escape(this.fShowTitle) + "/episodes/" +
        escape(this.fTitle);
    } else if (this.isNew()) {
      return "/shows/" +
        escape(this.collection.show_title.replace(/ /g, '_')) + "/episodes";
    } else {
      return "/shows/" +
        escape(this.collection.show_title.replace(/ /g, '_')) + "/episodes/" +
        escape(this.startingTitle.replace(/ /g, '_'));
    }
  },

  initialize: function (options) {
    if (!options) options = {}
    this.startingTitle = this.get('title');
    if (options.fTitle) this.fTitle = options.fTitle
    if (options.fShowTitle) this.fShowTitle = options.fShowTitle
  },

  posts: function (options) {
    if (!this._posts) {
      this._posts = new MediaPassport.Collections.Posts([], {episode_id: this.id});
    }
    this._posts.episode_id = this.id;
    return this._posts;

    console.log(this._posts)
  },

  parse: function (response) {
    if (response.posts) {
      this.posts().set(response.posts);
      delete response.posts;
    }

    return response;
  }


})
