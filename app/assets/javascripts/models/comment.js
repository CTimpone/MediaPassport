MediaPassport.Models.Comment = Backbone.Model.extend({
  url: function () {
    if (this.isNew()) {
      return "/posts/" + this.get('post_id') + "/comments";
    } else {
      return "/posts/" + this.get('post_id') +
             "/comments/" + this.id;
    }
  }
})
