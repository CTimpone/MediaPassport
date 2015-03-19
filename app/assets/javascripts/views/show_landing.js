MediaPassport.Views.ShowLanding = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.session = options.session;

    this._episodes = this.model.episodes();

    this._apiEpisodes = new MediaPassport.Collections.ApiEpisodes({maze_id: this.model.escape('maze_id')});

    this._apiEpisodes.fetch({success: function () {
      if (!this.previewView) {
        this._apiEpisodes.mostRecentlyAired(this._previewEpisode);
      }
      this.addNew();
    }.bind(this)});

    this._previewEpisode = new MediaPassport.Models.ApiEpisode();

    this.subviews();

    this.listenTo(this._previewEpisode, "change", this.renderPreview);
    this.listenTo(this.model, "sync", function () {
      this._localLoaded = true;
      this.render();
    });
    this.listenTo(this.session, "create change", this.render)
  },

  template: JST['show_show'],

  events: {
    "change .season-selector": "getItems",
    "mouseover .episode-link": "choosePreviewEpisode",
    "click .watchlist-toggle": "toggleWatchlistItem"
  },

  render: function () {
    var content = this.template({
      show: this.model,
      session: this.session
    });

    this.$el.html(content);


    if (this._localLoaded === true) {
      $('.season-selector').empty();
      var season = Math.max.apply(null, this._episodes.pluck("season"));

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

    if (this._localLoaded === true) {

      var season = $('.season-selector').val();
      var episodes = this._episodes.where({season: parseInt(season)})

      this.renderItems(episodes);
    }

    return this;
  },

  renderItems: function (episodes) {
    this.subviews('.episodes-list').length !== 0 &&
      this.removeAllFromSelector('.episodes-list');
    _.each(episodes.reverse(), function (episode) {

      var subView = new MediaPassport.Views.EpisodeListItem({
        model: episode,
        show: this.model
      });

      this.addSubview('.episodes-list', subView);
      if (this.previewView) {
        this.previewView.render();
      }
    }.bind(this));
  },

  addNew: function () {
    var count = 0;

    this._apiEpisodes.each(function (episode) {
      this._episodes.CRU(_.clone(episode.attributes), {});

      count += 1;

      if (count === this._apiEpisodes.length) {
        var that = this;

        if (this._episodes.toCreate.length > 0) {

          this._episodes.batchSave({
            success: function () {
              that._apiLoaded = true;
              that._localLoaded = false;
              that.model.fetch();
            }.bind(that)
          }, that);
        }
      }

    }.bind(this));
  },

  choosePreviewEpisode: function (event) {
    var episodeTitle = $(event.currentTarget)[0].innerText;
    var attrs = _.clone(this._episodes.where({title: episodeTitle})[0].attributes);

    this._previewEpisode.set(attrs);
  },

  renderPreview: function () {
    if (this.previewView) {
      this.previewView.remove();
    } else {
      var encodedEpisode = encodeURIComponent(this._previewEpisode.get('title').replace(/ /g,'_'));
      var encodedShow = encodeURIComponent(this.model.get('title').replace(/ /g,'_'));
      var link = "#shows/" + encodedShow + "/episodes/" + encodedEpisode;
      $('.most-recent').attr("href", link)
    }
    var previewSubview = new MediaPassport.Views.EpisodePreview({
      model: this._previewEpisode
    });

    var selected = $('.season-selector').val();

    if (selected !== this._previewEpisode.escape('season')) {
      $('.season-selector').val(parseInt(this._previewEpisode.escape('season')));
    }

    this.previewView = previewSubview;
    this.addSubview('.episode-preview', this.previewView);
  },

  toggleWatchlistItem: function (event) {
    var items;
    var $button = $(event.currentTarget);
    if (!$button.prop("disabled")) {
      $button.html("Processing");
      $button.prop("disabled", true)
      items = new MediaPassport.Collections.WatchlistItems({
        show_title: encodeURIComponent(this.model.get('title'))
      });
      if (this.model.escape("watching") === "true") {
        if (window.confirm("Are you sure you want to remove " +
                            this.model.escape('title') + " from your watchlist?")) {
          items.create({}, {
            success: function () {
              $button.html("Add to your Watchlist");
              $button.prop("disabled", false);
              this.model.set({watching: false})
            }.bind(this)
          });
        } else {
          $button.prop("disabled", false)
          $button.html("Remove from Watchlist");
        }
      } else {
        items.create({}, {
          success: function () {
            $button.html("Remove from Watchlist");
            $button.prop("disabled", false);
            this.model.set({watching: true})
          }.bind(this)
        });
      }
    }
  }
})
