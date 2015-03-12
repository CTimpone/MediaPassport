MediaPassport.Views.NavView = Backbone.CompositeView.extend({
  template: JST["nav_bar"],

  events: {
    "click .sign-in": "signIn",
    "click .sign-up": "signUp",
    "submit .search": "triggerSearch"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  signIn: function (event) {
    Backbone.history.navigate("sign_in", {trigger: true});
  },
  
  signUp: function (event) {
    Backbone.history.navigate("sign_up", {trigger: true});
  },

  triggerSearch: function (event) {
    event.preventDefault();
    var data = $(event.target).serializeJSON();
    data.query = data.query.replace(/ /g, '_');
    var destination = "search?q=" + data.query
    Backbone.history.navigate(destination, {trigger: true})
  }
})
