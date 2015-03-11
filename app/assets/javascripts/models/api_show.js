MediaPassport.Models.ApiShow = Backbone.Model.extend({

  parse: function (response) {
    if (response.show) {
      var data = {}
      if (response.show.network) {
        data.network = response.show.network.name;
      } else if (response.show.webChannel) {
        data.network= response.show.webChannel.name;
      }
      data.maze_id = response.show.id;
      data.title = response.show.name;
      data.image_url = response.show.image.original;
      data.description = response.show.summary.replace(/<(?:.|\n)*?>/gm, '');
    }

    return data;
  }
})
