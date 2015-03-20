class User < ActiveRecord::Base
  has_attached_file :avatar,
    styles: { thumb: "50x50>", medium: "300x300>" },
    default_url: "missing.:style.gif"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  validates :username, :password_digest, :email, :session_token, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: {minimum: 6, maximum: 30}, allow_nil: true
  validates :username, length: {minimum: 5, maximum: 18}
  after_initialize :ensure_session_token

  has_many(
    :posts,
    class_name: "Post",
    foreign_key: :user_id,
    primary_key: :id
  )

  has_many(
    :comments,
    class_name: "Comment",
    foreign_key: :user_id,
    primary_key: :id
  )

  has_many(
    :endorsements,
    class_name: "Endorsement",
    foreign_key: :user_id,
    primary_key: :id
  )

  has_many(
    :ratings,
    class_name: "Rating",
    foreign_key: :user_id,
    primary_key: :id
  )

  has_many(
    :watchlist_items,
    class_name: "WatchlistItem",
    foreign_key: :user_id,
    primary_key: :id
  )

  def self.find_by_credentials(params)
    user = User.find_by(username: params[:username])
    if user && user.is_password?(params[:password])
      return user
    else
      return nil
    end
  end

  attr_reader :password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  def recommendations
    query = <<-SQL
    SELECT
      potentials.*
    FROM (
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
              watchlist_items.user_id = :user_id
          ) as watched
          ON watched.show_id = watchlist_items.show_id
          WHERE watchlist_items.user_id != :user_id
          GROUP BY
            watchlist_items.user_id
          ORDER BY
            num desc
          LIMIT
            :top_half
        ) AS similar_users
        ON similar_users.user_id = watchlist_items.user_id
        GROUP BY
          watchlist_items.show_id
        HAVING
          count(watchlist_items.user_id) > :matches
        ORDER BY
          count(watchlist_items.user_id) desc
        ) AS rec_ids
      ON shows.id = rec_ids.show_id) as potentials
    LEFT OUTER JOIN (
      SELECT
        shows.*
      FROM
        shows
      JOIN (
        SELECT
          watchlist_items.*
        FROM
          watchlist_items
        WHERE
          watchlist_items.user_id = :user_id) as user_items
      ON shows.id = user_items.show_id) as already_watched
    ON already_watched.id = potentials.id
    WHERE already_watched.id IS null
    SQL

    Show.find_by_sql([query, {user_id: self.id, top_half: User.all.length / 2, matches: 2}])
  end

  def relevant_posts
    query = <<-SQL
    SELECT
      posts.*, count(endorsements.*) as num_endorse
    FROM
      posts
    JOIN (
      SELECT
        episodes.*
      FROM
        episodes
      JOIN
        watchlist_items
        ON episodes.show_id = watchlist_items.show_id
      WHERE
        watchlist_items.user_id = :user_id
      ) as relevant_episodes
      ON posts.episode_id = relevant_episodes.id
    JOIN
      endorsements
      ON posts.id = endorsements.endorsable_id
    WHERE
      posts.created_at > :three_days_ago AND endorsements.endorsable_type = 'Post'
    GROUP BY
      posts.id
    ORDER BY
      num_endorse desc
    LIMIT
      4
    SQL

    Post.find_by_sql([query, {user_id: self.id, three_days_ago: Date.today - 3}])
  end

  def personal_show_average(show_id)
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
        WHERE
          ratings.user_id = ?
      SQL
    scores = (Rating.find_by_sql([query, show_id, self.id])).map {|rating| rating.score}
    if scores.length > 0
      avg = scores.inject(:+) / scores.length
      bucket = Episode::SCORES.keys.min_by { |val| (avg - val).abs }
      return Episode::SCORES[bucket]
    else
      return '-'
    end
  end



  def recent_posts
    query = <<-SQL
    SELECT
      posts.*
    FROM
      posts
    WHERE
      posts.user_id = :user
    ORDER BY
      posts.created_at DESC
    LIMIT
      4
    SQL

    Post.find_by_sql([query, {user: self.id}])
  end



  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end


end
