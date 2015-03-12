MediaPassport.Views.NewPost = Backbone.View.extend({
  template: JST["post_form"],

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }


})
