MediaPassport.Views.Landing = Backbone.CompositeView.extend({
  template: JST["landing"],

  events: {
    "click .schedule-tabs button": "switchView"
  },

  initialize: function (options) {
    this.session = options.session;
    this.shows = options.shows;
    this.localLoad = false;
    this.apiLoad = false;

    this.shows.fetch({
      success: function () {
        this.localLoad = true;
      }.bind(this)
    });

    this.collection = new MediaPassport.Collections.ApiSchedule();
    this.collection.fetch({
      success: function () {
        this.apiLoad = true;
      }.bind(this)
    });

    this._style = "list";
    this.listenTo(this.session, "change create", this.render)
  },

  render: function () {
    var content = this.template({
      session: this.session
    });
    this.$el.html(content);

    if (this.subviews('.schedule-container').length === 0) {
      this.removeSubviews();
    }
    $('.schedule-tabs button[type="' + this._style +'"]').addClass('active-schedule-view');
    if (this._style === "grid") {
      var scheduleView = new MediaPassport.Views.ScheduleView({
        shows: this.shows,
        collection: this.collection,
        apiLoad: this.apiLoad,
        localLoad: this.localLoad
      });
    } else if (this._style === "list"){
      var scheduleView = new MediaPassport.Views.ScheduleList({
        shows: this.shows,
        collection: this.collection,
        apiLoad: this.apiLoad,
        localLoad: this.localLoad
      });
    } else if (this._style === "personal" && !this.session.isNew()) {
      var scheduleView = new MediaPassport.Views.UserSchedule({
        shows: this.shows,
        collection: this.collection,
        apiLoad: this.apiLoad,
        localLoad: this.localLoad
      });
    }
    this.currentView = scheduleView;
    this.addSubview('.schedule-container', scheduleView);

    return this;
  },

  switchView: function (event) {
    this._style = $(event.currentTarget).attr('type');
    $('.schedule-tabs button').removeClass('active-schedule-view');
    this.apiLoad = this.currentView.apiLoad
    this.localLoad = this.currentView.localLoad
    this.currentView.remove();
    this.render();
  }
});
