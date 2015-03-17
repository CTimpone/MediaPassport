MediaPassport.Views.Landing = Backbone.CompositeView.extend({
  template: JST["landing"],

  initialize: function (options) {
    this.shows = options.shows;
    this.session = options.session;
    this.collection = new MediaPassport.Collections.ApiSchedule();
    this.collection.fetch();
    this._style = "grid";
    this.listenTo(this.session, "change create", this.render)
  },

  render: function () {
    console.log(this.session);
    var content = this.template({
      session: this.session
    });
    this.$el.html(content);

    if (this.subviews('.schedule-container').length === 0) {
      this.removeSubviews();
    }

    if (this._style === "grid") {
      var scheduleView = new MediaPassport.Views.ScheduleView({
        shows: this.shows,
        collection: this.collection
      });
    } else if (this._style === "list"){
      var scheduleView = new MediaPassport.Views.ScheduleList({
        shows: this.shows,
        collection: this.collection
      });
    } else if (this._style === "personal" && !this.session.isNew()) {
      var scheduleView = new MediaPassport.Views.UserSchedule({
        shows: this.shows,
        collection: this.collection
      });
    }
    this.addSubview('.schedule-container', scheduleView);

    return this;
  }
});
