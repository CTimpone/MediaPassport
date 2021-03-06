MediaPassport.Views.NewUser = Backbone.CompositeView.extend({
  tagName: "form",

  className: "user-form group",

  events: {
    "submit": "createUser",
    "change #user_avatar": "setAvatar"
  },

  template: JST["user_form/user_form"],

  render: function () {
    var content = this.template({signing_in: false});
    this.$el.html(content);

    return this;
  },

  initialize: function () {
    this.user = new MediaPassport.Models.User();
  },

  createUser: function (event) {
    event.preventDefault();
    $('.errors').empty();
    var data = this.$el.serializeJSON();

    this.user.set(data);

    this.model.clear({silent: true});
    this.user.save({}, {
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
  },

  setAvatar: function (event) {
    var file = event.currentTarget.files[0];
    $('.errors').html("<li>Processing File</li>");

    var fileReader = new FileReader();

    fileReader.onloadend = function () {
      this.user.set("avatar", fileReader.result);
      $('.errors').empty();
    }.bind(this)
    if (file !== undefined) {
      fileReader.readAsDataURL(file);
    } else {
      $('.errors').empty();
    }
  }
})
