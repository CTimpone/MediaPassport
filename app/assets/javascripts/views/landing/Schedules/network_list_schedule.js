MediaPassport.Views.NetworkListSchedule = Backbone.CompositeView.extend({
  template: JST["landing/schedules/network_list"],

  className: "network-container",

  render: function () {
    var content = this.template({
      network: this.model
    });
    this.$el.html(content);

    var selector = '.network-schedule[network=' + this.model.replace(/[^\w]/gi, '') + ']';
    this.collection.each(function (episode) {
      var subview = new MediaPassport.Views.EpisodeScheduleItem({
        model: episode
      });
      this.addSubview(selector, subview);
    }.bind(this));
    return this;
  }
});
