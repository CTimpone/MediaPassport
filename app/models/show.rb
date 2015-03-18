class Show < ActiveRecord::Base
  include PgSearch
  multisearchable against: :title

  validates :title, :description, :network, presence: true
  validates :maze_id, uniqueness: true, allow_nil: true

  has_many(
    :episodes,
    class_name: "Episode",
    foreign_key: :show_id,
    primary_key: :id
  )

  has_many(
    :watchlist_items,
    class_name: "WatchlistItem",
    foreign_key: :show_id,
    primary_key: :id
  )

  def most_recent_episode
    episodes.order(airdate: :desc).first
  end

  def timeframe
    sorted = episodes.order(:airdate)
    return sorted.first.airdate.strftime('%a %d %b %Y') + " to " +
           sorted.last.airdate.strftime('%a %d %b %Y')
  end

  def seasons
    episodes.pluck(:season).max
  end

  def num_episodes
    episodes.length
  end
end
