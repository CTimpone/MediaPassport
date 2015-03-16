MediaPassport.Collections.ApiSchedule = Backbone.Collection.extend({
  url: "http://api.tvmaze.com/schedule",

  model: MediaPassport.Models.ApiEpisode
})
