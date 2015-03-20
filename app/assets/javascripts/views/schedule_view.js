MediaPassport.Views.ScheduleView = Backbone.CompositeView.extend({
  template: JST["schedule"],

  tagName: "section",

  className: "schedule-section",

  initialize: function (options) {
    this.shows = options.shows;

    this.localLoad = true;
    this.apiLoad = options.apiLoad;
    this.session = options.session;

    this.skipCRU = options.skipCRU;

    if (this.skipCRU) {
      this.developGrid();
    }

    this.listenToOnce(this.collection, "sync", function () {
      this.apiLoad = true;
      this.render();
    }.bind(this));

    this.listenTo(this.session, "destroy", function () {
      this.render();
    }.bind(this));
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    if (this.localLoad && this.apiLoad) {

    var timer = setInterval(function () {
      this.networks = this.collection.map(function (model) {
        return model.show().escape('network').replace(/&amp;/g, '&');
      });
      this.networks = _.uniq(this.networks).sort();

      _.each(this.networks, function (network) {

        if ($('.grid-row[network="' + network.replace(/[^\w]/gi, '') +'"]').length === 0) {
          var row = "<tr class='grid-row' network=" +
                    network.replace(/[^\w]/gi, '') + "><th class='network-name'>" +
                    network + "</th></tr>";
          $('.schedule').append($(row));
        }
      });

      this.times = this.collection.pluck("airtime");
      this.times = ["20:00", "20:30", "21:00", "21:30", "22:00"].concat(this.times);
      this.times = this.times.sort();
      this.times = _.uniq(this.times);
      if ($('.time-col').length === 0) {
        _.each(this.times, function (time) {
          var base = parseInt(time.slice(0, 2));
          if (base > 12) {
            var USTime = String(Math.abs(base - 12)) + time.slice(2, 5);
          } else if (base === 0) {
            var USTime = "12" + time.slice(2, 5);
          } else if (time === "") {
            var USTime = "12:00";
          } else {
            var USTime = time.slice(1, 5);
          }
          var col = "<th class='time-col'>" + USTime + "</th>";

          $('.grid-header').append($(col));
        });
      }


      if (this.skipCRU) {
        this.developGrid();
      } else{
        this.generateSchedule();
      }
      clearInterval(timer);
    }.bind(this), 1)


    }

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


              $.ajax({
                type: "POST",
                url: '/episodes/batch_verify',
                data: {episodes: data},
                dataType: 'json',
              });


              that.developGrid();

            }
          }, that);
        }
      }.bind(this));
    }
  },

  developGrid: function () {

    this.developed = true;
    this.skipCRU = true;
    _.each(this.networks, function (network) {

      var newEpisodes = this.collection.where({network: network});
      var tempCollection = new MediaPassport.Collections.ApiEpisodes(newEpisodes)
      var selector = '.grid-row[network="' +
                      network.replace(/[^\w]/gi, '') +
                      '"]';

      var skips = 1;
      _.each(this.times, function (time) {
        if (skips === 1) {
          var episode = tempCollection.where({airtime: time});
          if (episode.length !== 0) {
            skips =  Math.floor(parseInt(episode[0].get('runtime')) / 30);
            var subview = new MediaPassport.Views.ScheduleGridItem({
              model: episode[0]
            });
          } else {
            var subview = new MediaPassport.Views.ScheduleGridItem({
              model: null
            });
          }
          this.addSubview(selector, subview);
        } else {
          skips -= 1;
        }
      }.bind(this));
    }.bind(this));
  }
})
