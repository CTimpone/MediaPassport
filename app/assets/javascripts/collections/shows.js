MediaPassport.Collections.Shows = Backbone.Collection.extend({
  model: MediaPassport.Models.Show,

  url: "/shows",

  CRU: function (attributes) {
    var exactShow = this.where({title: attributes.title, maze_id: attributes.maze_id});

    if (exactShow.length === 0) {
      exactShow = this.where({title: attributes.title + " (" + attributes.network + ")", maze_id: attributes.maze_id})
    }

    var sameTitle = this.where({title: attributes.title});

    if (!attributes.description) {
      attributes.description = "No available description";
    }

    if (exactShow.length === 1) {
      show = exactShow[0];
      if (show.escape('description') === "No available description" &&
          attributes.description !== show.escape('description') &&
          attributes.description !== ""
          ) {
            show.save({description: attributes.description})
          }
    } else {
      show = new this.model(attributes);
      console.log(attributes)
      if (exactShow.length === 0 && sameTitle.length === 0) {
        show = this.create(attributes);
      } else if (exactShow.length === 0 && sameTitle.length > 0){
        attributes.title += " (" + attributes.network + ")"
        show = this.create(attributes);
      }
    }

    return show;
  }
})
