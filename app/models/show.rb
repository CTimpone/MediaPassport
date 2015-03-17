class Show < ActiveRecord::Base
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

  def self.user_recommendations(user_id)
    query = <<-SQL

    SELECT
      shows.*
    FROM
      shows
    JOIN (
      SELECT
        watchlist_items.show_id,
        count(watchlist_items.user_id) as user_count
      FROM
        watchlist_items
      JOIN (
        SELECT
          watchlist_items.user_id,
          count(watchlist_items.show_id) as num
        FROM
          watchlist_items
        JOIN (
          SELECT
            watchlist_items.show_id
          FROM
            watchlist_items
          WHERE
            watchlist_items.user_id = ?
        ) as watched
        ON watched.show_id = watchlist_items.show_id
        WHERE watchlist_items.user_id != ?
        GROUP BY
          watchlist_items.user_id
        ORDER BY
          num desc
        LIMIT
          ?
      ) AS similar_users
      ON similar_users.user_id = watchlist_items.user_id
      GROUP BY
        watchlist_items.show_id
      HAVING
        count(watchlist_items.user_id) > ?
      ORDER BY
        count(watchlist_items.user_id) desc
      ) AS rec_ids
    ON shows.id = rec_ids.show_id
    SQL

    Show.find_by_sql([query, user_id, user_id, 6, 2])
  end


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
