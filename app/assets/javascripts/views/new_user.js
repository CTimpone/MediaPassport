MediaPassport.Views.NewUser = Backbone.CompositeView.extend({
  tagName: "form",

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
        console.log(this.model)
        Backbone.history.navigate("", {trigger: true});
      }.bind(this)
    });
  }
})
