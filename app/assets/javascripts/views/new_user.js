MediaPassport.Views.NewUser = Backbone.CompositeView.extend({
  tagName: "form",

  className: "user-form group",

  events: {
    "submit": "createUser"
  },

  template: JST["user_form"],

  render: function () {
    var content = this.template({signing_in: false});
    this.$el.html(content);

    return this;
  },

  createUser: function (event) {
    event.preventDefault();
    var data = this.$el.serializeJSON();

    var user = new MediaPassport.Models.User(data);
    this.model.clear({silent: true});
    user.save({}, {
      success: function () {
        this.model.fetch();
        Backbone.history.navigate("", {trigger: true});
      }.bind(this),

      error: function (object, response) {
        this.render();
        _.each(response.responseJSON.errors, function (error) {
          $('.errors').append($("<li>" + error + "</li>"))
        }.bind(this))
      }.bind(this)
    });
  }
})
