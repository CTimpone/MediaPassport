MediaPassport.Views.ShowLanding = Backbone.CompositeView.extend({
  initialize: function (options) {
    this._loaded = 0;

    this._episodes = this.model.episodes();

    this._apiEpisodes = new MediaPassport.Collections.ApiEpisodes({maze_id: this.model.escape('maze_id')});

    this._apiEpisodes.fetch({success: function () {
      this._loaded = true;
      this.render();
    }.bind(this)});

    this.listenToOnce(this.model, "sync", this.render);
  },

  template: JST['show_show'],

  render: function () {
    var content = this.template({show: this.model});
    this.$el.html(content);

    if (this._loaded === true) {
      this.renderItems();
    }

    return this;
  },

  renderItems: function () {
    $('.episodes-list').empty();
    if (this._loaded === true) {
      this._apiEpisodes.each(function (episode) {
        var dbEpisode = this._episodes.getOrCreate(_.clone(episode.attributes));
        var subView = new MediaPassport.Views.EpisodeListItem({
          model: dbEpisode
        });
        this.addSubview('.episodes-list', subView)
      }.bind(this));

    }

    return this;
  }
})
