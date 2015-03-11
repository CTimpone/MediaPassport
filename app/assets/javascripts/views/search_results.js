MediaPassport.Views.SearchResults = Backbone.CompositeView.extend({
  initialize: function () {
    this._networks = new MediaPassport.Collections.Networks();
    this._shows = new MediaPassport.Collections.Shows();
    this._results = new MediaPassport.Collections.ApiShows({title: "Office"});

    this._loadedTables = 0;

    this._networks.fetch({success: function () {
      this._loadedTables += 1;
    }.bind(this)});
    this._shows.fetch({success: function () {
      this._loadedTables += 1;
    }.bind(this)});
    this._results.fetch({success: function () {
      this._loadedTables += 1;
    }.bind(this)});

    this.listenTo(this._shows, "sync", this.renderItems);
    this.listenTo(this._results, "sync", this.renderItems);
  },

  template: JST['search_results'],

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  renderItems: function () {

    if (this._loadedTables === 3) {
      this._results.each(function (show) {
        var subView = new MediaPassport.Views.SearchResultItem({
          model: show,
          networks: this._networks,
          shows: this._shows
        });
        this.addSubview('.results-list', subView)
      }.bind(this));
    }
    return this;
  }
})
