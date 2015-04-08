MediaPassport.Views.NavView = Backbone.CompositeView.extend({
  template: JST["landing/nav_bar"],

  events: {
    "click .sign-in": "signIn",
    "click .sign-up": "signUp",
    "click .sign-out": "signOut",
    "submit .search": "triggerSearch",
    "click #search-bar": "clearBar"
  },

  className: "navigation group",

  initialize: function () {
    this.signedIn = false;
    this.listenTo(this.model, "change create", this.render)
  },

  render: function () {
    if (!this.model.isNew()) {
      this.signedIn = true;
    }
    var content = this.template({user: this.model, signedIn: this.signedIn});
    this.$el.html(content);

    return this;
  },

  signIn: function (event) {
    MediaPassport.previousLoc = window.location.hash.replace('#','')
    Backbone.history.navigate("sign_in", {trigger: true});
  },

  signUp: function (event) {
    Backbone.history.navigate("sign_up", {trigger: true});
  },

  signOut: function (event) {
    this.signedIn = false;
    this.model.destroy({
      wait: true,
      success: function () {
        this.model.clear();
      }.bind(this)
    });
  },

  clearBar: function (event) {
    $(event.currentTarget).val("")
  },

  triggerSearch: function (event) {
    event.preventDefault();
    var data = $(event.target).serializeJSON();
    data.query = data.query.replace(/ /g, '_');
    var destination = "search?q=" + data.query
    if (data.query !== "") {
      Backbone.history.navigate(destination, {trigger: true})
    }
  }
})
