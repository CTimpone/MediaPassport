MediaPassport.Collections.ApiSchedule = Backbone.Collection.extend({
  url: "https://api.tvmaze.com/schedule",

  model: MediaPassport.Models.ApiEpisode
})
