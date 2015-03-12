MediaPassport.Views.SearchResults = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.query = window.location.hash.split('q=')[1]
    this._shows = options.shows;
    this._results = new MediaPassport.Collections.ApiShows({title: this.query});

    this._results.fetch({success: function () {
      this._loadedTables = true;
    }.bind(this)});

    this.listenToOnce(this._shows, "sync", this.renderItems);
    this.listenToOnce(this._results, "sync", this.renderItems);
  },

  template: JST['search_results'],

  render: function () {
    var content = this.template();
    this.$el.html(content);

    if (this._loadedTables === true) {
      this.renderItems();
    }
    return this;
  },

  renderItems: function () {
    $('.results-list').empty();
    if (this._loadedTables === true) {
      this._results.each(function (show) {
        var dbShow = this._shows.getOrCreate(_.clone(show.attributes));
        var subView = new MediaPassport.Views.SearchResultItem({
          model: dbShow
        });
        this.addSubview('.results-list', subView)
      }.bind(this));
    }
    return this;
  }
})
