MediaPassport.Collections.Networks = Backbone.Collection.extend({
  model: MediaPassport.Models.Network,

  url: "/networks",

  checkExistence: function (name) {
    return this.where({name: name})
  },

  getOrCreate: function (name) {
    var network = this.checkExistence(name);

    if (network.length === 0) {
      network = this.create({network: {name: name}});
    } else {
      network = network[0];
    }

    return network;
  }
})
