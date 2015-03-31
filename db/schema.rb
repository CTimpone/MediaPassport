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

ActiveRecord::Schema.define(version: 20150331175448) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: true do |t|
    t.integer  "user_id",    null: false
    t.text     "content",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "post_id"
    t.integer  "parent_id"
  end

  add_index "comments", ["parent_id"], name: "index_comments_on_parent_id", using: :btree
  add_index "comments", ["post_id"], name: "index_comments_on_post_id", using: :btree

  create_table "endorsements", force: true do |t|
    t.integer  "user_id",         null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "endorsable_type"
    t.integer  "endorsable_id"
  end

  add_index "endorsements", ["endorsable_id"], name: "index_endorsements_on_endorsable_id", using: :btree

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
    t.string   "airtime"
    t.string   "network"
  end

  add_index "episodes", ["show_id", "maze_id"], name: "index_episodes_on_show_id_and_maze_id", using: :btree

  create_table "pg_search_documents", force: true do |t|
    t.text     "content"
    t.integer  "searchable_id"
    t.string   "searchable_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "posts", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "episode_id", null: false
    t.string   "title",      null: false
    t.text     "content",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "posts", ["user_id", "episode_id"], name: "index_posts_on_user_id_and_episode_id", using: :btree

  create_table "ratings", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "episode_id", null: false
    t.integer  "score",      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "ratings", ["user_id", "episode_id"], name: "index_ratings_on_user_id_and_episode_id", using: :btree

  create_table "shows", force: true do |t|
    t.string   "title",       null: false
    t.text     "description", null: false
    t.string   "image_url"
    t.integer  "maze_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "network"
  end

  add_index "shows", ["maze_id"], name: "index_shows_on_maze_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "username",                            null: false
    t.string   "email",                               null: false
    t.string   "password_digest",                     null: false
    t.string   "session_token",                       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "active",              default: false
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree

  create_table "watchlist_items", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "show_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "watchlist_items", ["user_id", "show_id"], name: "index_watchlist_items_on_user_id_and_show_id", using: :btree

end
