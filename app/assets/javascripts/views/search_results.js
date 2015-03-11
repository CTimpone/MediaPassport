MediaPassport.Views.SearchResults = Backbone.CompositeView.extend({
  initialize: function () {
    this._networks = new MediaPassport.Collections.Networks();
    this._loaded = 0;
    this._networks.fetch({success: function () {
      this._loaded += 1;
    }.bind(this)});
    this._results = new MediaPassport.Collections.ApiShows({title: "Office"});
    this._results.fetch({success: function () {
      this._loaded += 1;
    }.bind(this)});
    this.listenTo(this._networks, "sync", this.renderItems);
    this.listenTo(this._results, "sync", this.renderItems);
  },

  template: JST['search_results'],

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  renderItems: function () {

    if (this._loaded === 2) {
      this._results.each(function (show) {
        var subView = new MediaPassport.Views.SearchResultItem({model: show, networks: this._networks});
        this.addSubview('.results-list', subView)
      }.bind(this));
    }
    return this;
  }
})
