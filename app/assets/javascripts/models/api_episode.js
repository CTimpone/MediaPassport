MediaPassport.Models.ApiEpisode = Backbone.Model.extend({

  parse: function (response) {
    if (response.length > 0) {
      var data = {}
      data.maze_id = response.id;
      data.season = response.season;
      data.position = response.number;
      data.title = response.name;
      data.image_url = response.image.original;
      data.description = response.summary.replace(/<(?:.|\n)*?>/gm, '');
      data.airdate = new Date(response.airdate);
    }

    return data;
  }
})
