MediaPassport.Models.Session = Backbone.Model.extend({
  url: "/session",

  toJSON: function () {
    return {
      user: _.clone(this.attributes)
    };
  }
})
