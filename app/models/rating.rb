class Rating < ActiveRecord::Base
  validates :user_id, :episode_id, :score, presence: true
  validates :score, inclusion: { in: 59..100 }
  validates :score, uniqueness: {scope: [:user_id, :episode_id]}

  belongs_to(
    :user,
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
