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
    episodes.where("airdate <= ?", Date.today).order(airdate: :desc).limit(1)
  end

  def timeframe
    sorted = episodes.order(:airdate)
    return sorted.first.airdate.strftime('%a %d %b %Y') + " to " +
           sorted.last.airdate.strftime('%a %d %b %Y')
  end

  def average_episode_rating
    query = <<-SQL
        SELECT
          ratings.*
        FROM
          ratings
        JOIN (
          SELECT
            episodes.*
          FROM
            episodes
          WHERE
            episodes.show_id = ?
        ) as current_episodes
        ON current_episodes.id = ratings.episode_id
      SQL
    scores = (Rating.find_by_sql([query, self.id])).map {|rating| rating.score}
    if scores.length > 0
      avg = scores.inject(:+) / scores.length
      bucket = Episode::SCORES.keys.min_by { |val| (avg - val).abs }
      return Episode::SCORES[bucket]
    else
      return '-'
    end
  end

  def seasons
    episodes.pluck(:season).max
  end

  def num_episodes
    episodes.length
  end
end
