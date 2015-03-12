MediaPassport.Views.NewUser = Backbone.CompositeView.extend({
  tagName: "form",

  template: JST["user_form"],

  render: function () {
    var content = this.template({signing_in: false});
    this.$el.html(content);

    return this;
  }
})
