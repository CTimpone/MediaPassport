class Show < ActiveRecord::Base
  validates :title, :description, :network_id, presence: true
  validates :title, uniqueness: true
  validates :maze_id, uniqueness: true, allow_nil: true

  belongs_to(
    :network,
    class_name: "Network",
    foreign_key: :network_id,
    primary_key: :id
  )

  has_many(
    :episodes,
    class_name: "Episode",
    foreign_key: :show_id,
    primary_key: :id
  )
end
