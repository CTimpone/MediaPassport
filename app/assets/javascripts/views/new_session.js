MediaPassport.Views.NewSession = Backbone.CompositeView.extend({
  tagName: "form",

  className: "user-form group",

  events: {
    "submit": "createSession"
  },

  template: JST["user_form"],

  render: function () {
    var content = this.template({signing_in: true});
    this.$el.html(content);

    return this;
  },

  createSession: function (event) {
    event.preventDefault();
    var data = this.$el.serializeJSON();
    if (!MediaPassport.previousLoc) {
      MediaPassport.previousLoc = "";
    }

    this.model.save(data, {
      success: function () {
        Backbone.history.navigate(MediaPassport.previousLoc, {trigger: true});
        console.log(this.model);
      }.bind(this),

      error: function (obj, response) {
        $('.errors').empty();
        this.render();
        _.each(response.responseJSON.errors, function (error) {
          $('.errors').append($("<li>" + error + "</li>"))
        }.bind(this))
      }.bind(this)
    });

  }
})
