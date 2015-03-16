MediaPassport.Models.Rating = Backbone.Model.extend({
  url: function () {
    if (this.isNew()) {
      return "/ratings";
    } else {
      return "/ratings/" + this.id
    }
  }
})
