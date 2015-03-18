MediaPassport.Views.NewSession = Backbone.CompositeView.extend({
  tagName: "form",

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
      }.bind(this),

      error: function (response) {
        this.render();
        _.each(response.get('errors'), function (error) {
          $('.errors').append($("<li>" + error + "</li>"))
        }.bind(this))
      }.bind(this)
    });

  }
})
