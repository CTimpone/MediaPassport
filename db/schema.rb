# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150310174258) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "episodes", force: true do |t|
    t.integer  "show_id",     null: false
    t.string   "title",       null: false
    t.text     "description"
    t.integer  "maze_id"
    t.integer  "season",      null: false
    t.integer  "position",    null: false
    t.date     "airdate",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_url"
  end

  add_index "episodes", ["show_id", "maze_id"], name: "index_episodes_on_show_id_and_maze_id", using: :btree

  create_table "networks", force: true do |t|
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "shows", force: true do |t|
    t.string   "title",       null: false
    t.text     "description", null: false
    t.string   "image_url"
    t.integer  "maze_id"
    t.integer  "network_id",  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "shows", ["maze_id"], name: "index_shows_on_maze_id", using: :btree
  add_index "shows", ["network_id"], name: "index_shows_on_network_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree

end
