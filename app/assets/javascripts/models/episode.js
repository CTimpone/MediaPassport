MediaPassport.Models.Episode = Backbone.Model.extend({
  url: function () {
    if (this.isNew()) {
      return "/shows/" +
        escape(this.collection.show_title.replace(/ /g, '_')) + "/episodes";
    } else {
      return "/shows/" +
        escape(this.collection.show_title.replace(/ /g, '_')) + "/episodes/" +
        escape(this.startingTitle.replace(/ /g, '_'));
    }
  },

  initialize: function () {
    this.startingTitle = this.get('title');
  }
})
