class WatchlistItem < ActiveRecord::Base
  validates :user_id, :show_id, presence: true
  validates :user_id, uniqueness: {scope: :show_id}

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )

  belongs_to(
    :show,
    class_name: "Show",
    foreign_key: :show_id,
    primary_key: :id
  )
end
