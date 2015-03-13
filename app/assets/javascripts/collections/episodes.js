MediaPassport.Collections.Episodes = Backbone.Collection.extend({
  url: function () {
    return "/shows/" + this.show_title.replace(/ /g, '_') + "/episodes/";
  },

  model: MediaPassport.Models.Episode,

  comparator: function (model) {
    return -(model.get('season') * 10000 - model.get('position'))
  },

  initialize: function (models, options) {
    this.show_title = options.show_title;
  },

  CRU: function (attributes) {
    var exactEpisode = this.where({season: attributes.season, position: attributes.position});

    if (!attributes.description) {
      attributes.description = "No available description";
    }

    if (exactEpisode.length === 1) {
      episode = exactEpisode[0];
      var descChange = episode.get('description') === "No available description" &&
                      attributes.description !== episode.get('description') &&
                      episode.description !== "";

      var imgChange = (episode.get("image_url") === null && attributes.image_url !== undefined)
      var titleChange = (/episode/.exec(episode.escape("title").toLowerCase()) &&
                        !(/episode/.exec(attributes.title.toLowerCase())))

      if (descChange && imgChange && titleChange) {
        episode.save({
          title: attributes.title,
          description: attributes.description,
          image_url: attributes.image_url
        })

      } else if (descChange && imgChange) {
        episode.save({
          description: attributes.description,
          image_url: attributes.image_url
        });

      } else if (titleChange && imgChange) {
        episode.save({
          title: attributes.title,
          image_url: attributes.image_url
        });

      } else if (descChange && titleChange) {
        episode.save({
          description: attributes.description,
          title: attributes.title
        });

      } else if (imgChange) {
        episode.save({image_url: attributes.image_url});

      } else if (descChange) {
        episode.save({description: attributes.description});

      } else if (titleChange) {
        episode.save({title: attributes.title});
      }

    } else {
      episode = new this.model();
      if (exactEpisode.length === 0 && this.where({title: attributes.title}).length === 0) {
        episode = this.create(attributes);
      } else {
        var title = attributes.title + " (S" + attributes.season + ")";
        attributes.title = title;
        episode = this.create(attributes);
      }
    }

    return episode;
  }
})
