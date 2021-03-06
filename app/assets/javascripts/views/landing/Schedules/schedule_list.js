MediaPassport.Views.ScheduleList = MediaPassport.Views.ScheduleView.extend({
  template: JST["landing/schedules/schedule_list"],

  tagName: "section",

  className: "schedule-list-section",

  initialize: function (options) {
    this.shows = options.shows;
    this.localSchedule = options.localSchedule;

    this.localLoad = options.localLoad;
    this.apiLoad = options.apiLoad;

    this.masonified = false;

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

    if (!this.masonified) {
      $('.lists-container').masonry({
        columnWidth: 200,
        gutter: 20,
        itemSelector: '.network-container'
      });

      this.masonified = true;
    }


    return this;
  },

  developLists: function () {
    if (this.subviews('.lists-container').length === 0) {
      var $container = $('.lists-container');
      $container.empty();

      this.networks = this.localSchedule.map(function (model) {
        return model.escape('network').replace(/&amp;/g, '&');
      });

      this.networks = _.uniq(this.networks).sort();

      _.each(this.networks, function (network) {
        if (network !== "") {
          var newEpisodes = this.localSchedule.where({network: network});
          var networkSubview = new MediaPassport.Views.NetworkListSchedule({
            collection: new MediaPassport.Collections.Episodes(newEpisodes, {}),
            model: network
          });

          this.addSubview('.lists-container', networkSubview);
        }
      }.bind(this));
    }
  }
})
