MediaPassport.Views.ScheduleList = MediaPassport.Views.ScheduleView.extend({
  template: JST["schedule_list"],

  tagName: "section",

  className: "schedule-list-section",

  initialize: function (options) {
    this.shows = options.shows;
    this.localSchedule = options.localSchedule;

    this.localLoad = options.localLoad;
    this.apiLoad = options.apiLoad;

    this.listenTo(this.localSchedule, "sync", function () {
      this.developLists();
    }.bind(this));

    this.listenToOnce(this.collection, "sync", function () {
      this.apiLoad = true;
      this.generateSchedule();
    }.bind(this));

    this.listenToOnce(this.shows, "sync", function () {
      this.localLoad = true;
      this.render();
    }.bind(this));
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    this.developLists();

    return this;
  },

  developLists: function () {
    $('.lists-container').empty();
    this.networks = this.localSchedule.map(function (model) {
      return model.escape('network').replace(/&amp;/g, '&');
    });
    this.networks = _.uniq(this.networks).sort();

    _.each(this.networks, function (network) {
      if (network !== "") {
        var newEpisodes = this.localSchedule.where({network: network});
        var networkSubview = new MediaPassport.Views.NetworkListSchedule({
          collection: newEpisodes,
          model: network
        });
        this.addSubview('.lists-container', networkSubview);
      }
    }.bind(this));
  }
})
