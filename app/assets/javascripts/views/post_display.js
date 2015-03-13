MediaPassport.Views.PostDisplay = Backbone.CompositeView.extend({
  template: JST["post_display"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({post: this.model});
    this.$el.html(content);

    if (this.model.get('comment_tree')) {
      var children = this.model.get('comment_tree')[""];
      if (children) {
        _.each(children, function (comment) {
          console.log(comment)
        }.bind(this))
      }
    }
    return this;
  }
});
