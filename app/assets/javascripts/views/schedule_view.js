MediaPassport.Views.ScheduleView = Backbone.CompositeView.extend({
  template: JST["schedule"],

  tagName: "section",

  className: "schedule-section",

  initialize: function (options) {
    this.shows = options.shows;

    this.localLoad = true;
    this.apiLoad = options.apiLoad;

    this.skipCRU = options.skipCRU;

    this.listenToOnce(this.collection, "sync", function () {
      this.apiLoad = true;
      this.render();
    }.bind(this));

    // this.listenToOnce(this.shows, "sync", function () {
    //   this.localLoad = true;
    //   this.render();
    // }.bind(this));

    this.count = 1;
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    if (this.localLoad && this.apiLoad) {

      this.networks = this.collection.map(function (model) {
        return model.show().escape('network').replace(/&amp;/g, '&');
      });
      this.networks = _.uniq(this.networks).sort();

      _.each(this.networks, function (network) {
        var row = "<tr class='grid-row' network=" +
                  network.replace(/[^\w]/gi, '') + "><td class='network-name'>" +
                  network + "</td></tr>";
        $('.schedule').append($(row));
      });

      this.times = this.collection.pluck("airtime");
      this.times = ["20:00", "20:30", "21:00", "21:30", "22:00"].concat(this.times);
      this.times = _.uniq(this.times);
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
        var col = "<th>" + USTime + "</th>";
        $('.grid-header').append($(col));
      });

      if (this.skipCRU) {
        this.developGrid();
      } else{
        this.generateSchedule();
      }
    }

    return this;
  },

  generateSchedule: function () {
    if (this.localLoad && this.apiLoad && this.count === 1) {
      this.count = 100;
      this.localLoad = false;
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
                success: function () {
                  that.localLoad = true;
                }
              });


              that.developGrid();




            }
          }, that);
        }
      }.bind(this));
    }
  },

  developGrid: function () {
    this.skipCRU = true;

    var timer = setInterval(function () {
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
      clearInterval(timer);
    }.bind(this), 1);
  }
})
