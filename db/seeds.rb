# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Cheat Sheet
# Chris
# Breaking Bad
# Deadwood
# Justified
# Slings & Arrows
# Arrow
# Sherlock
# Game of Thrones
#
# RealUser
# Breaking Bad
# Deadwood
# Arrow
# The Flash
# Agents of Shield
#
# JJJSchmidt
# Deadwood
# Justified
# Grimm
# 12 Monkeys
# Helix
#
# MoveableObject
# Elementary
# Sherlock
# Doctor Who
# The Fades
# Black Mirror

# CrazyPerson
# Last Man Standing
# Cristela
# Hart of Dixie
# Paw Patrol

# Hendrix
#
# User1 - password
# Arrow
# The Shield
# Agents of Shield
# Breaking Bad
# Deadwood
# Justified
#
# User2 - password
# Arrow
# The Shield
# Agents of Shield
# Breaking Bad
# Deadwood
# The Wire
# Spartacus
#
# User3 - password
# The Flash
# Justified
# Deadwood
# Game of Thrones
# The 100
#
# User4 - password
# Last Man Standing
# Cristela
# Grimm
# Hart of Dixie
# Sherlock
# Elementary
#
# User5 - password
# Arrow
# Breaking Bad
# Deadwood
# Justified
# Spartacus
# The Wire

User.delete_all
Show.delete_all
Episode.delete_all
Post.delete_all
Comment.delete_all
Endorsement.delete_all
Rating.delete_all
WatchlistItem.delete_all
PgSearch::Document.delete_all(searchable_type: "Episode")
PgSearch::Document.delete_all(searchable_type: "Show")
