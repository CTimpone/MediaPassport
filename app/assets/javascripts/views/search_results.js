MediaPassport.Views.SearchResults = Backbone.CompositeView.extend({
  tagName: "article",

  className: "search-results",

  initialize: function (options) {
    this.query = window.location.hash.split('q=')[1]
    this._shows = options.shows;

    this._apiResults = new MediaPassport.Collections.ApiShows({title: this.query});
    this._localResults = new MediaPassport.Collections.Search({query: this.query});

    this._apiResults.fetch({
      success: function () {
        this._apiLoaded = true;
      }.bind(this)
    });

    this._localResults.fetch({
      success: function () {
        this._localLoaded = true;
      }.bind(this)
    });

    this.listenToOnce(this._shows, "sync", this.render);
    this.listenToOnce(this._apiResults, "sync", this.render);
    this.listenToOnce(this._localResults, "sync", this.render);
  },

  template: JST['search_results'],

  render: function () {
    var content = this.template();
    this.$el.html(content);

    if (this._localLoaded === true) {
      this.renderItems();
    }
    return this;
  },

  renderItems: function () {
    this._localResults.each(function (result) {
      var subView = new MediaPassport.Views.SearchResultItem({
        model: result
      });
      this.addSubview('.results-list', subView)
    }.bind(this));
    this.appendNew();
  },

  appendNew: function () {
    if (this._apiLoaded === true) {
      this._apiResults.each(function (show) {
        var match = this._localResults.where({maze_id: parseInt(show.escape('maze_id'))});
        console.log(match);
        if (match.length === 0) {
          $('.just-added-results').removeClass('invis');
          var dbShow = this._shows.CRU(_.clone(show.attributes), {});
          var subview = new MediaPassport.Views.ApiSearchResult({
            model: show
          });
          this.addSubview('.just-added-results', subview);
        }
      }.bind(this));
    }
    return this;
  }
})
