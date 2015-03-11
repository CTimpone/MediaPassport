MediaPassport.Collections.Episodes = Backbone.Collection.extend({
  urlRoot: "/shows/:show_title/episodes/",

  model: MediaPassport.Models.Episode,

  comparator: function (model) {
    return -(model.get('season') * 10000 - model.get('position'))
  },

  initialize: function (options) {
    this.show_title = options.show_title;
  }
})
