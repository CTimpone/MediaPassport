MediaPassport.Models.Episode = Backbone.Model.extend({
  urlRoot: function () {
    return "/shows/" + this.collection.show_title.replace(/ /g, '_') + "/episodes";
  },
})
