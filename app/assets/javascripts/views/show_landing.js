MediaPassport.Views.ShowLanding = Backbone.CompositeView.extend({
  initialize: function (options) {
    this._loaded = 0;

    this._episodes = this.model.episodes();

    this._apiEpisodes = new MediaPassport.Collections.ApiEpisodes({maze_id: this.model.escape('maze_id')});

    this._apiEpisodes.fetch({success: function () {
      this._loaded = true;
      this.render();
    }.bind(this)});
    this._previewEpisode = new MediaPassport.Models.ApiEpisode();

    this.subviews();

    this.listenTo(this._previewEpisode, "change", this.renderPreview)
    this.listenToOnce(this.model, "sync", this.render);
  },

  template: JST['show_show'],

  events: {
    "change .season-selector": "getItems",
    "mouseover .episode-link": "choosePreviewEpisode"
  },

  render: function () {
    var content = this.template({show: this.model});
    this.$el.html(content);

    if (this._loaded === true) {
      $('.season-selector').empty();
      var season = Math.max.apply(null, this._apiEpisodes.pluck("season"))
      var $selector = $('.season-selector');
      for (var i = season; i > 0; i--) {
        var option = '<option value="' + i + '">Season '+ i +
                     '</option>'
        $selector.append($(option))
      };
      this.getItems();
    }

    return this;
  },

  getItems: function () {
    $('.episodes-list').empty();

    if (this._loaded === true) {
      if (!this.previewView) {
        this._apiEpisodes.mostRecentlyAired(this._previewEpisode);
      }
      var season = $('.season-selector').val();
      var episodes = this._apiEpisodes.where({season: parseInt(season)})

      this.renderItems(episodes);
    }

    return this;
  },

  renderItems: function (episodes) {
    this.subviews('.episodes-list').length !== 0 &&
      this.removeAllFromSelector('.episodes-list');
    _.each(episodes.reverse(), function (episode) {

      var dbEpisode = this._episodes.CRU(_.clone(episode.attributes, {}));
      var subView = new MediaPassport.Views.EpisodeListItem({
        model: dbEpisode,
        show: this.model
      });

      this.addSubview('.episodes-list', subView);
    }.bind(this));
  },

  choosePreviewEpisode: function (event) {
    var episodeTitle = $(event.currentTarget)[0].innerText;
    var attrs = _.clone(this._episodes.where({title: episodeTitle})[0].attributes);

    this._previewEpisode.set(attrs);
  },

  renderPreview: function () {
    this.previewView && this.previewView.remove();
    var previewSubview = new MediaPassport.Views.EpisodePreview({model: this._previewEpisode});

    var selected = $('.season-selector').val();
    if (selected !== this._previewEpisode.escape('season')) {
      $('.season-selector').val(parseInt(this._previewEpisode.escape('season')));
      this.getItems();
    }

    this.previewView = previewSubview;
    this.addSubview('.episode-preview', this.previewView);
  }
})
