MediaPassport.Collections.Episodes = Backbone.Collection.extend({
  url: function () {
    return "/shows/" + this.show_title.replace(/ /g, '_') + "/episodes/";
  },

  model: MediaPassport.Models.Episode,

  comparator: function (model) {
    return -(model.get('season') * 10000 - model.get('position'))
  },

  initialize: function (models, options) {
    console.log(options)
    this.show_title = options.show_title;
  },

  getOrCreate: function (attributes) {
    var exactEpisode = this.where({season: attributes.season, position: attributes.position});

    if (exactEpisode.length === 0) {
      exactEpisode = this.where({title: attributes.title});
    }

    if (!attributes.description) {
      attributes.description = "No available description";
    }

    if (exactEpisode.length === 1) {
      episode = exactEpisode[0];
    } else {
      episode = new this.model();
      if (exactEpisode.length === 0) {
        episode = this.create(attributes);
      }
    }

    return episode;
  }
})
