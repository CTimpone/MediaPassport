class Comment < ActiveRecord::Base
  validates :user_id, :post_id, :content, presence: true

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )

  belongs_to(
    :post,
    class_name: "Post",
    foreign_key: :post_id,
    primary_key: :id
  )

  has_many(
    :children,
    class_name: "Comment",
    foreign_key: :parent_id,
    primary_key: :id
  )

  belongs_to(
    :parent,
    class_name: "Comment",
    foreign_key: :parent_id,
    primary_key: :id
  )

  has_many :endorsements, as: :endorsable
end
