MediaPassport.Views.ScheduleGrid = MediaPassport.Views.ScheduleView.extend({
  template: JST["landing/schedules/schedule"],

  tagName: "section",

  className: "schedule-section",

  initialize: function (options) {
    this.shows = options.shows;
    this.localSchedule = options.localSchedule;

    this.localLoad = true;
    this.apiLoad = options.apiLoad;
    this.session = options.session;

    this.listenTo(this.localSchedule, "sync", function () {
      this.developGrid();
    }.bind(this));

    this.listenToOnce(this.collection, "sync", function () {
      this.apiLoad = true;
      this.generateSchedule();
    }.bind(this));

  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    this.developGrid();

    return this;
  },

  developGrid: function () {
    var timer = setInterval(function () {
      this.times = this.localSchedule.pluck("airtime");

      var blankIdx = this.times.indexOf("");

      if (blankIdx !== -1) {
        for (var i = 0; i < this.times.length; i++) {
          if (this.times[i] === "") {
            this.times[i] = "00:00";
          }
        }
      }

      if (this.times.indexOf("23:35") !== -1 && this.times.indexOf("00:00") === -1) {
        this.times = this.times.concat(["00:00"]);
      }

      this.times = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
                    "22:00", "22:30"].concat(this.times);

      this.networks = this.localSchedule.map(function (model) {
        return model.escape('network').replace(/&amp;/g, '&');
      });
      this.networks = _.uniq(this.networks).sort();

      var addedRows = 0;
      _.each(this.networks, function (network) {
        this.times = this.times.sort(function (a, b) {
          hourA = parseInt(a.slice(0, 2));
          hourB = parseInt(b.slice(0, 2));
          minA = parseInt(a.slice(3, 5));
          minB = parseInt(b.slice(3, 5));

          if (hourA === 0 && hourB !== 0) {
            return 1;
          } else if (hourB === 0 && hourA !== 0) {
            return -1;
          } else if (hourA === hourB && minA < minB) {
            return -1;
          } else if (hourA < hourB) {
            return -1;
          } else {
            return 1;
          }
        });

        if ($('.grid-row[network="' + network.replace(/[^\w]/gi, '') +'"]').length === 0) {
          var row = "<tr class='grid-row' network=" +
                    network.replace(/[^\w]/gi, '') + "><th class='network-name'>" +
                    network + "</th></tr>";
          this.$('.schedule').append($(row));

          addedRows += 1;

          if (addedRows === this.networks.length) {

            this.times = _.uniq(this.times);

            if ($('.time-col').length === 0) {

              _.each(this.times, function (time) {
                if (time !== null) {
                  var base = parseInt(time.slice(0, 2));
                  if (base > 12) {
                    var USTime = String(Math.abs(base - 12)) + time.slice(2, 5);
                  } else if (base === 0) {
                    var USTime = "12" + time.slice(2, 5);
                  } else {
                    var USTime = time.slice(1, 5);
                  }
                  var col = "<th class='time-col'>" + USTime + "</th>";

                  $('.grid-header').append($(col));
                }
              });
            }

            _.each(this.networks, function (network) {

              var newEpisodes = this.localSchedule.where({network: network});
              var tempCollection = new MediaPassport.Collections.Episodes(newEpisodes, {})
              var selector = '.grid-row[network="' +
                              network.replace(/[^\w]/gi, '') +
                              '"]';

              var skips = 1;
              _.each(this.times, function (time) {
                if (skips === 1) {
                  var episode = tempCollection.where({airtime: time});

                  if (time === "00:00" && episode.length === 0) {
                    episode = tempCollection.where({airtime: ""});
                  }

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

        }
      }.bind(this));
      clearInterval(timer);
    }.bind(this), 1);


  }
})
