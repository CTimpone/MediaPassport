class Comment < ActiveRecord::Base
  validates :user_id, :post_id, :content, presence: true

  belongs_to(
    :author,
    class_type: "User",
    foreign_key: :user_id,
    primary_key: :id
  )

  belongs_to(
    :post,
    class_type: "Post",
    foreign_key: :post_id,
    primary_key: :id
  )

  has_many(
    :children,
    class_type: "Comment",
    foreign_key: :parent_id,
    primary_key: :id
  )

  belongs_to(
    :parent,
    class_type: "Comment",
    foreign_key: :parent_id,
    primary_key: :id
  )


end
