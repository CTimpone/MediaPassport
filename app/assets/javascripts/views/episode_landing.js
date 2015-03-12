MediaPassport.Views.EpisodeLanding = Backbone.CompositeView.extend({
  template: JST["episode_landing"],

  initialize: function (options) {
    this.session = options.session;
  },

  render: function () {
    var content = this.template({episode: this.model});
    this.$el.html(content);

    if (!this.session.isNew()) {

    }

    return this;
  }
})
