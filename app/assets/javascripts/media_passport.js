window.MediaPassport = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new MediaPassport.Routers.Router({
      $rootEl: $('.main-container'),
      $headerEl: $('#header')
    })
    Backbone.history.start();
  }
};

$(document).ready(function(){
  MediaPassport.initialize();
});
