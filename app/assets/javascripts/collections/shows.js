MediaPassport.Collections.Shows = Backbone.Collection.extend({
  model: MediaPassport.Models.Show,

  url: "/shows",

  getOrCreate: function (title, maze_id) {
    var show = this.where({title: title});

    if (network.length === 0) {
      network = this.create({network: {name: name}});
    } else {
      network = network[0];
    }

    return network;
  }
})
