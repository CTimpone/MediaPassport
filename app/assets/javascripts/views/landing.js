MediaPassport.Views.Landing = Backbone.CompositeView.extend({
  template: JST["landing"],

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});
