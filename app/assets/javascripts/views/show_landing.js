MediaPassport.Views.ShowLanding = Backbone.CompositeView.extend({
  initialize: function (options) {
    this._apiEpisodes = new MediaPassport.Collections.ApiEpisodes({maze_id: this.model.escape('maze_id')});


    this._apiEpisodes.fetch({success: function () {
      this.renderItems();
    }.bind(this)});

    this.listenTo(this.model, "sync", this.render);
  },

  template: JST['show_show'],

  render: function () {
    var content = this.template({show: this.model});
    this.$el.html(content);

    return this;
  },

  renderItems: function () {
    $('.episodes-list').empty();

    this._apiEpisodes.each(function (episode) {
      var dbEpisode = this.model.episodes().getOrCreate(_.clone(episode.attributes));
      var subView = new MediaPassport.Views.EpisodeListItem({
        model: dbEpisode
      });
      this.addSubview('.episodes-list', subView)
    }.bind(this));

    return this;
  }
})
