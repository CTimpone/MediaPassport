MediaPassport.Views.SearchResults = Backbone.CompositeView.extend({
  tagName: "article",

  className: "search-results",

  initialize: function (options) {
    this.query = window.location.hash.split('q=')[1]
    this._shows = options.shows;
    this._apiResults = new MediaPassport.Collections.ApiShows({title: this.query});

    this._apiResults.fetch({success: function () {
      this._apiLoaded = true;
    }.bind(this)});

    this.listenToOnce(this._shows, "sync", this.renderItems);
    this.listenToOnce(this._apiResults, "sync", this.renderItems);
  },

  template: JST['search_results'],

  render: function () {
    var content = this.template();
    this.$el.html(content);

    if (this._apiLoaded === true) {
      this.appendNew();
    }
    return this;
  },

  appendNew: function () {
    $('.results-list').empty();
    if (this._loadedTables === true) {
      this._apiResults.each(function (show) {
        var dbShow = this._shows.CRU(_.clone(show.attributes), {});
        var subView = new MediaPassport.Views.SearchResultItem({
          model: dbShow
        });
        this.addSubview('.results-list', subView)
      }.bind(this));
    }
    return this;
  }
})
