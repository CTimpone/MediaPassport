# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.delete_all
Show.delete_all
Episode.delete_all
Post.delete_all
Comment.delete_all
PgSearch::Document.delete_all(searchable_type: "Episode")
PgSearch::Document.delete_all(searchable_type: "Show")
