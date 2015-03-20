MediaPassport.Collections.ApiSchedule = Backbone.Collection.extend({
  url: "//api.tvmaze.com/schedule",

  model: MediaPassport.Models.ApiEpisode
})
