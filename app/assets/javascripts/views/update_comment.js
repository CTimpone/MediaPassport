MediaPassport.Views.UpdateComment = Backbone.View.extend({
  tagName: "form",

  className: "group",

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
    this.model.save(data, {
      success: function () {
        this.remove();
      }.bind(this),
      error: function (obj, response) {
        this.render();
        _.each(response.responseJSON.errors, function (error) {
          $('.errors').append($("<li>" + error + "</li>"))
        }.bind(this));
      }.bind(this)
    });
  }
})
