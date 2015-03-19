class Post < ActiveRecord::Base
  validates :user_id, :episode_id, :title, :content, presence: true
  validates :title, uniqueness: {scope: :episode_id}

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )

  belongs_to(
    :episode,
    class_name: "Episode",
    foreign_key: :episode_id,
    primary_key: :id
  )

  has_many(
    :comments,
    class_name: "Comment",
    foreign_key: :post_id,
    primary_key: :id
  )

  has_many :endorsements, as: :endorsable

  def self.top_posts
    query = <<-SQL
    SELECT
      posts.*, count(endorsements.*) as num_endorse
    FROM
      posts
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
  end

  def comment_tree
    tree = Hash.new { |h, k| h[k] = [] }

    self.comments.each do |comment|
      tmp = {
        id: comment.id,
        user_id: comment.user_id,
        content: comment.content,
        post_id: comment.post_id,
        parent_id: comment.parent_id,
        created_at: comment.created_at,
        total_points: comment.total_points,
        author: comment.author.username
      }
      tree[comment.parent_id] << tmp
    end

    tree
  end

  def total_points
    endorsements.length
  end
end
