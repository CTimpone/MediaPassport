MediaPassport.Views.ScheduleList = Backbone.CompositeView.extend({
  template: JST["schedule_list"],

  tagName: "section",

  className: "schedule-list-section",

  initialize: function (options) {
    this.shows = options.shows;
    this.localSchedule = options.localSchedule;

    this.localLoad = options.localLoad;
    this.apiLoad = options.apiLoad;

    this.skipCRU = options.skipCRU;

    if (this.skipCRU) {
      this.developLists();
    }

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

    return this;
  },

  generateSchedule: function () {
    if (this.localLoad && this.apiLoad) {
      var count = 0;
      var len = this.collection.length;
      col = this.collection;
      this.collection.each(function (episode) {
        var dbEpisode;
        this.shows.CRU(_.clone(episode.show().attributes), {})
        count += 1;
        if (count === this.collection.length) {

          var that = this;

          this.shows.batchSave({
            success: function () {
              var data = that.collection.map(function (model) {
                return _.clone(model.attributes);
              });

              that.developed = true;
              that.skipCRU = true;

              $.ajax({
                type: "POST",
                url: '/episodes/batch_verify',
                data: {episodes: data},
                dataType: 'json',
                success: function () {
                  that.localSchedule.fetch();
                }
              });

            }
          }, that);
        }
      }.bind(this));
    }
  },

  developLists: function () {
    this.networks = this.localSchedule.map(function (model) {
      return model.escape('network').replace(/&amp;/g, '&');
    });
    this.networks = _.uniq(this.networks).sort();

    _.each(this.networks, function (network) {
      var newEpisodes = this.localSchedule.where({network: network});
      var networkSubview = new MediaPassport.Views.NetworkListSchedule({
        collection: newEpisodes,
        model: network
      });
      this.addSubview('.lists-container', networkSubview);
    }.bind(this));
  }
})
