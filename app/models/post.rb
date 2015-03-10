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
end
