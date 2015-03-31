MediaPassport.Collections.Episodes = Backbone.Collection.extend({
  url: function () {
    var obj = encodeURIComponent("{test: test}");
    if (this.verify && this.episode_title) {
      return "/shows/" + this.show_title + "/episodes/" +
             this.episode_title + "/verify?q=" + obj;
    } else {
      return "/shows/" + encodeURIComponent(this.show_title.replace(/ /g, '_')) +
             "/episodes/";
    }
  },

  model: MediaPassport.Models.Episode,

  comparator: function (model) {
    return -(model.get('season') * 10000 - model.get('position'))
  },

  initialize: function (models, options) {
    if (options.show_title) this.show_title = options.show_title;
    if (options.verify) this.verify = options.verify;
    if (options.episode_title) this.episode_title = options.episode_title;

    this.toCreate = [];
    this.newTitles = [];
  },

  CRU: function (attributes) {
    var exactEpisode = this.where({season: attributes.season, position: attributes.position});

    if (!attributes.description) {
      attributes.description = "No available description";
    }

    var sameTitle = this.where({title: attributes.title});

    if (sameTitle.length === 0) {
      _.each(this.newTitles, function (title) {
        if (attributes.title === title) {
          sameTitle.push(title)
        }
      });
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
      if (exactEpisode.length === 0 && sameTitle.length === 0) {
        this.toCreate.push(attributes);

        this.newTitles.push(attributes.title);
        this.newTitles = _.uniq(this.newTitles);
      } else {
        var title = attributes.title + " (S" + attributes.season + ")";
        this.toCreate.push(attributes);

        this.newTitles.push(attributes.title);
        this.newTitles = _.uniq(this.newTitles);
      }
    }

    return episode;
  },

  batchSave: function (options, context) {
    var toCreate = (_.uniq(this.toCreate));
    var createUrl = "/shows/" + encodeURIComponent(this.show_title.replace(/ /g, '_')) +
                    "/episodes/batch_create";

    $.ajax({
      type: "POST",
      url: createUrl,
      data: {episodes: toCreate},
      dataType: 'json',
      success: function () {
        options.success && options.success();
        this.toCreate = [];
      }.bind(this)
    });
  }


})
