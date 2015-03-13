MediaPassport.Views.ShowLanding = Backbone.CompositeView.extend({
  initialize: function (options) {
    this._loaded = 0;

    this._episodes = this.model.episodes();

    this._apiEpisodes = new MediaPassport.Collections.ApiEpisodes({maze_id: this.model.escape('maze_id')});

    this._apiEpisodes.fetch({success: function () {
      this._loaded = true;
      this.render();
    }.bind(this)});

    this.subviews();

    this.listenToOnce(this.model, "sync", this.render);
  },

  template: JST['show_show'],

  events: {
    "change .season-selector": "renderItems"
  },

  render: function () {
    var content = this.template({show: this.model});
    this.$el.html(content);

    var $selector = $('.season-selector');
    for (var i = this.model.get('seasons'); i > 0; i--) {
      var option = '<option value="' + i + '">Season '+ i +
                   '</option>'
      $selector.append($(option))
    }

    if (this._loaded === true) {
      this.renderItems();
    }

    return this;
  },

  renderItems: function () {
    $('.episodes-list').empty();
    var season = $('.season-selector').val();

    if (this._loaded === true) {
      // episodes = this._apiEpisodes.where({season: parseInt(season)})
      this._apiEpisodes.each(function (episode) {
        var dbEpisode = this._episodes.CRU(_.clone(episode.attributes));
        var subView = new MediaPassport.Views.EpisodeListItem({
          model: dbEpisode,
          show: this.model
        });
        this.addSubview('.episodes-list', subView)
      }.bind(this));

    }

    return this;
  }
})
