MediaPassport.Views.NewSession = Backbone.CompositeView.extend({
  tagName: "form",

  template: JST["user_form"],

  render: function () {
    var content = this.template({signing_in: true});
    this.$el.html(content);

    return this;
  }
})
