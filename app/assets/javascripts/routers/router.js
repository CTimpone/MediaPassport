MediaPassport.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "search",
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  search: function () {
    var view = new MediaPassport.Views.SearchResults();
    this.$rootEl.html(view.render().$el)
  }
})
