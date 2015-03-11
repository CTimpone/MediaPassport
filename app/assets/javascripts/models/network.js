MediaPassport.Models.Network = Backbone.Model.extend({
  urlRoot: "/networks",

  initialize: function (options) {
    this.name = options.name;
  }
})
