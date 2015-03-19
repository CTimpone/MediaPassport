MediaPassport.Collections.Shows = Backbone.Collection.extend({
  model: MediaPassport.Models.Show,

  url: "/shows",

  initialize: function () {
    this.toCreate = [];
    this.newTitles = [];
    this.saved = false;
  },

  CRU: function (attributes, options) {
    var exactShow = this.where({title: attributes.title, maze_id: attributes.maze_id});

    if (exactShow.length === 0) {
      exactShow = this.where({title: attributes.title + " (" + attributes.year + ")", maze_id: attributes.maze_id})
    }

    var sameTitle = this.where({title: attributes.title});

    if (sameTitle.length === 0) {
      _.each(this.newTitles, function (title) {
        if (attributes.title === title) {
          sameTitle.push(title)
        }
      });
    }

    if (!attributes.description) {
      attributes.description = "No available description";
    }


    if (exactShow.length === 1) {
      show = exactShow[0];
      var descMatch = show.escape('description') === "No available description" &&
                      attributes.description !== show.escape('description') &&
                      attributes.description !== "";

      var imgMatch = (show.get("image_url") === null && attributes.image_url !== null)

      if (descMatch && imgMatch) {
        show.save({description: attributes.description, image_url: attributes.image_url}, {
          success: function () {
            options.success && options.success();
          }
        })
      } else if (descMatch) {
        show.save({description: attributes.description}, {
          success: function () {
            options.success && options.success();
          }
        });
      } else if (imgMatch) {
        show.save({image_url: attributes.image_url}, {
          success: function () {
            options.success && options.success();
          }
        });
      } else {
        options.success && options.success();
      }

    } else {
      show = new this.model(attributes);
      if (exactShow.length === 0 && sameTitle.length === 0) {
        this.toCreate.push(attributes);

        this.newTitles.push(attributes.title);
        this.newTitles = _.uniq(this.newTitles);
      } else if (exactShow.length === 0 && sameTitle.length > 0){
        attributes.title += " (" + attributes.year + ")"
        this.toCreate.push(attributes);

        this.newTitles.push(attributes.title);
        this.newTitles = _.uniq(this.newTitles);
      }
    }

    return show;
  },

  batchSave: function (options, context) {
    var toCreate = (_.uniq(this.toCreate));

    if (toCreate.length === 0) {
      options.success && options.success();
    } else {
      $.ajax({
        type: "POST",
        url: '/shows/batch_create',
        data: {shows: toCreate},
        dataType: 'json',
        success: function () {
          options.success && options.success();
          this.toCreate = [];
        }.bind(this)
      });
    }
  }
})
