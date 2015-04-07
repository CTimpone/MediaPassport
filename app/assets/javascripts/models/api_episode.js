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
      data.airtime = response.airtime;
      data.runtime = response.runtime;
      if (response.image) {
        data.image_url = response.image.original;
      }
      if (response.show) {

        if (response.show.network) {
          data.network = response.show.network.name;
        } else if (response.show.webChannel) {
          data.network= response.show.webChannel.name;
        }
        
        data.show_maze_id = response.show.id;
        data.year = response.show.premiered.slice(0, 4);
        this.show().set(this.show().parse(response));
      }
      if (response.airdate) {
        var parts = response.airdate.match(/(\d+)/g);
        data.airdate = new Date(parts[0], parts[1]-1, parts[2]);
      }
    }
    return data;
  }
})
