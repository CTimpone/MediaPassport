MediaPassport.Views.SearchResults = Backbone.CompositeView.extend({
  tagName: "article",

  className: "search-results",

  initialize: function (options) {
    this.query = window.location.hash.split('q=')[1]
    this._shows = options.shows;
    this.page = 1;

    this._apiResults = new MediaPassport.Collections.ApiShows({title: this.query});
    this._localResults = new MediaPassport.Collections.Search({
      query: this.query,
      page: this.page
    });

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
    this.listenTo(this._apiResults, "sync", this.render);
    this.listenTo(this._localResults, "sync", this.render);
  },

  events: {
    "click .paginators a":"changePage"
  },

  template: JST['search/search_results'],

  render: function () {
    var content = this.template();
    this.$el.html(content);

    if (this._localLoaded === true) {
      this.renderItems();
      if (this._localResults.length < 10 && this.page === 1) {
        $('.paginators').addClass('invis');
      }
    }

    if (this._apiLoaded === true) {
      this.appendNew();
    }
    return this;
  },

  renderItems: function () {
    if (this._localResults.length > 0) {
      this._localResults.each(function (result) {
        var subView = new MediaPassport.Views.SearchResultItem({
          model: result
        });
        this.addSubview('.results-list', subView)
      }.bind(this));
    } else {
      $('.results-list').append($("<li class='no-results'>No results found for that query</li>"))
    }

  },

  appendNew: function () {
    if (this._apiLoaded === true) {
      var count = 0;
      var len = this._apiResults.length;
      this._apiResults.each(function (show) {
        count += 1;
        var match = this._localResults.where({maze_id: parseInt(show.escape('maze_id'))});
        if (match.length === 0) {
          var dbShow = this._shows.CRU(_.clone(show.attributes), {});
        }

        if (len === count) {
          if (this._shows.toCreate.length > 0) {
            var that = this;
            this._shows.batchSave({
              success: function () {
                that._localResults.fetch();
                that._apiLoaded = false;
              }
            }, that);
          }

          this._localResults.fetch();
          this._apiLoaded = false;
        }
      }.bind(this));
    }
    return this;
  },

  changePage: function (event) {
    var dir = parseInt($(event.currentTarget).attr("dir"));

    this.page += dir;
    this._localResults.page = this.page;

    this._localResults.fetch();
  }
})
