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
    class_type: "Comment",
    foreign_key: :post_id,
    primary_key: :id
  )

  def comment_tree
    tree = Hash.new { |h, k| h[k] = [] }

    self.comments.includes(:author).each do |comment|
      tree[comment.parent_id] << comment
    end

    tree
  end
end
