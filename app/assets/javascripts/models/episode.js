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
  }
})
