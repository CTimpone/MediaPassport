MediaPassport.Views.RecommendationItem = Backbone.View.extend({
  template: JST["recommendation_item"],

  tagName: "tr",

  className: "recommendation-item",

  events: {
    "click .add-to-list": "addToList"
  },

  render: function () {
    var content = this.template({
      item: this.model
    });
    this.$el.html(content);

    return this;
  },

  addToList: function (event) {
    var items;
    var $button = $(event.currentTarget);
    if (!$button.prop("disabled")) {
      $button.html("Processing");
      $button.prop("disabled", true)
      items = new MediaPassport.Collections.WatchlistItems({
        show_title: encodeURIComponent(this.model.get('title'))
      });
      items.create({}, {
        success: function () {
          this.collection.fetch();
          this.remove();
        }.bind(this)
      });
    }
  }
});
