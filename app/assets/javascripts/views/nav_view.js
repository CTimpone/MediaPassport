MediaPassport.Views.NavView = Backbone.CompositeView.extend({
  template: JST["nav_bar"],

  events: {
    "click .sign-in": "signIn",
    "click .sign-up": "signUp",
    "click .sign-out": "signOut",
    "submit .search": "triggerSearch"
  },

  initialize: function () {
    this.signedIn = false;
    this.listenTo(this.model, "sync destroy", this.render)
  },

  render: function () {
    debugger
    if (!this.model.isNew()) {
      this.signedIn = true;
    }
    var content = this.template({user: this.model, signedIn: this.signedIn});
    this.$el.html(content);

    return this;
  },

  signIn: function (event) {
    Backbone.history.navigate("sign_in", {trigger: true});
  },

  signUp: function (event) {
    Backbone.history.navigate("sign_up", {trigger: true});
  },

  signOut: function (event) {
    this.model.destroy({wait: true});
    this.model = new MediaPassport.Models.Session();
    this.signedIn = false;
  },

  triggerSearch: function (event) {
    event.preventDefault();
    var data = $(event.target).serializeJSON();
    data.query = data.query.replace(/ /g, '_');
    var destination = "search?q=" + data.query
    Backbone.history.navigate(destination, {trigger: true})
  }
})
