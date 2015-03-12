MediaPassport.Models.User = Backbone.Model.extend({
  urlRoot: "/users",

  toJSON: function () {
    return {
      user: _.clone(this.attributes)
    };
  }
})
