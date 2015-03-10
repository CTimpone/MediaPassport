# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
network = Network.create(name: "HBO")
got = Show.create(title: "Game of Thrones", description: "Song of Ice and Fire",
            image_url: "http://tvmazecdn.com/uploads/images/medium_portrait/0/581.jpg",
            maze_id: 82, network_id: network.id)
td = Show.create(title: "True Detective", description: "Flat Circle",
            image_url: "http://tvmazecdn.com/uploads/images/medium_portrait/0/61.jpg",
            maze_id: 5, network_id: network.id)
Episode.create(title: "Winter is Coming", show_id: 1, season: 1, position: 1,
                description: "Lord Eddard Stark, ruler of the North, is summoned to court by his old friend, King Robert Baratheon, to serve as the King's Hand. Eddard reluctantly agrees after learning of a possible threat to the King's life. Eddard's bastard son Jon Snow must make a painful decision about his own future, while in the distant east Viserys Targaryen plots to reclaim his father's throne, usurped by Robert, by selling his sister in marriage.",
                airdate: Date.new(2011,04,17))

Episode.create(title: "Pilot", show_id: td.id, season: 1, position: 1,
                airdate: Date.today)
