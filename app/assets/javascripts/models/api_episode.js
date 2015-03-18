MediaPassport.Models.ApiEpisode = Backbone.Model.extend({

  show: function () {
    if (!this._show) {
      this._show = new MediaPassport.Models.ApiShow();
    }

    return this._show;
  },

  parse: function (response) {
    if (response) {
      var data = {}
      data.maze_id = response.id;
      data.season = response.season;
      data.position = response.number;
      data.title = response.name.replace(/\./g,'');
      data.description = response.summary.replace(/<(?:.|\n)*?>/gm, '');
      data.airdate = new Date(response.airdate);
      data.airtime = response.airtime;
      data.runtime = response.runtime;
      if (response.image) {
        data.image_url = response.image.original;
      }
      if (response.show) {
        data.network = response.show.network.name;
        data.show_maze_id = response.show.id;
        this.show().set(this.show().parse(response));
      }
    }
    return data;
  }
})
