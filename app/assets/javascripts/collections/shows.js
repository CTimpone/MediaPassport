MediaPassport.Collections.Shows = Backbone.Collection.extend({
  model: MediaPassport.Models.Show,

  url: "/shows",

  CRU: function (attributes, options) {
    var exactShow = this.where({title: attributes.title, maze_id: attributes.maze_id});

    if (exactShow.length === 0) {
      exactShow = this.where({title: attributes.title + " (" + attributes.year + ")", maze_id: attributes.maze_id})
    }

    var sameTitle = this.where({title: attributes.title});

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
        show = this.create(attributes, {
          wait: true,
          success: function () {
            options.success && options.success();
          }
        });
      } else if (exactShow.length === 0 && sameTitle.length > 0){
        attributes.title += " (" + attributes.year + ")"
        show = this.create(attributes, {
          wait: true,
          success: function () {
            options.success && options.success();
          }
        });
      }
    }

    return show;
  }
})
