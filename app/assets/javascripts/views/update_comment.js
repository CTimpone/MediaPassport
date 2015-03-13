MediaPassport.Views.UpdateComment = Backbone.View.extend({
  tagName: "form",

  events: {
    "submit": "updateComment"
  },

  template: JST["comment_form"],

  render: function () {
    var content = this.template({comment: this.model});
    this.$el.html(content);

    return this;
  },

  updateComment: function (event) {
    event.preventDefault();
    var data = this.$el.serializeJSON();
    this.model.save(data)
  }
})
