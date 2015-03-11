MediaPassport.Views.EpisodeShow = Backbone.CompositeView.extend({
  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
  },

  template: JST['show_show'],

  render: function () {
    var content = this.template({show: this.model});
    this.$el.html(content);

    console.log(this.model)
    return this;
  },

  // renderItems: function () {
  //   $('.results-list').empty();
  //   if (this._loadedTables === 1) {
  //     this._results.each(function (show) {
  //       var dbShow = this._shows.getOrCreate(_.clone(show.attributes));
  //       var subView = new MediaPassport.Views.SearchResultItem({
  //         model: dbShow
  //       });
  //       this.addSubview('.results-list', subView)
  //     }.bind(this));
  //   }
  //   return this;
  // }
})
