MediaPassport.Views.SearchResultItem = Backbone.View.extend({
  tagName: "li",

  initialize: function (options) {
    this.networks = options.networks;
    this.shows = options.
    this.network = this.networks.getOrCreate(this.model.escape("network_name"));
  },

  template: JST['search_result_item'],

  render: function () {
    var content = this.template({network: this.network.escape("name")});
    this.$el.html(content);

    return this;
  }
})
